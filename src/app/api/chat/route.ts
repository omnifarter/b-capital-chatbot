import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { Message, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createTitle } from "@/helpers";
import { prisma } from "@/prisma";

export const GET = async () => {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return prisma.chat.findMany({
    where: {
      userId: user.id,
    },
  });
};

export const POST = async (req: Request) => {
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data: { chatId: string; messages: Message[] } = await req.json();
  let chatId = data.chatId;
  const messages = data.messages;
  // if chatId doesn't exist, create it
  if (!chatId) {
    const chat = await prisma.chat.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        title: createTitle(messages[0].content),
      },
    });
    chatId = chat.id;
  } else {
    const record = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: user.id,
      },
    });
    if (!record) {
      return new Response("Forbidden", { status: 403 });
    }
  }
  prisma.message.create({
    data: {
      text: messages[messages.length - 1].content,
      chat: {
        connect: {
          id: chatId,
        },
      },
      sender: "USER",
    },
  });

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
    async onFinish({ text }) {
      // once finished, save in the database.
      await prisma.message.create({
        data: {
          text,
          chat: {
            connect: {
              id: chatId,
            },
          },
          sender: "BOT",
        },
      });
    },
  });

  return result.toDataStreamResponse();
};
