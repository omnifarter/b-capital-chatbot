import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { CoreMessage, Message, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
const prisma = new PrismaClient();

// don't want the chat title to be too long...
const createTitle = (message: string) => {
  if (message.length <= 25) {
    return message;
  } else {
    return message.slice(0, 22) + "...";
  }
};

export const POST = async (req: Request) => {
  const user = await currentUser();
  let { chatId, messages }: { chatId: string; messages: Message[] } =
    await req.json();
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
    //TODO: check if user is able to access the chat id.
  }

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
