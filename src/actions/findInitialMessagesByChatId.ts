"use server";
import { validateChatWithUser } from "@/helpers/validation";
import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Message } from "ai";
import { redirect } from "next/navigation";

export default async function findInitialMessagesByChatId(
  chatId?: string
): Promise<Message[]> {
  if (!chatId) {
    return [];
  }
  const user = await currentUser();
  if (user?.id && !(await validateChatWithUser(chatId, user.id))) {
    redirect("/404");
  }
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
        createdAt: "asc",
      },
      take: 9, // we will only send up to 10 of the latest messages, including the latestMessage
    })
  ).map((message) => ({
    id: message.id,
    content: message.text,
    role: message.sender == "BOT" ? "assistant" : "user",
  }));
}
