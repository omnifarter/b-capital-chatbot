"use server";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { Message } from "ai";

const prisma = new PrismaClient();

export default async function getInitialMessages(
  chatId?: string
): Promise<Message[]> {
  if (!chatId) {
    return [];
  }
  const user = await currentUser();
  return (
    await prisma.message.findMany({
      where: {
        chat: {
          userId: {
            equals: user?.id,
          },
        },
        chatId: {
          equals: chatId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 9, // we will only send up to 10 of the latest messages, including the latestMessage
    })
  ).map((message) => ({
    id: message.id,
    content: message.text,
    role: message.sender == "BOT" ? "assistant" : "user",
  }));
}
