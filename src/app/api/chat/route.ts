import { currentUser } from "@clerk/nextjs/server";
import { Message, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { prisma } from "@/prisma";
import { validateChatWithUser } from "@/helpers/validation";

export const POST = async (req: Request) => {
  const user = await currentUser();
  const data: { chatId: string; messages: Message[] } = await req.json();
  let chatId = data.chatId;
  const messages = data.messages;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (chatId && !(await validateChatWithUser(chatId, user.id))) {
    return new Response("Forbidden", { status: 403 });
  }
  // save the user message in the db, and create the chatId if it doesn't exist.
  await prisma.message.create({
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
      // once finished, save bot message in the database.
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
