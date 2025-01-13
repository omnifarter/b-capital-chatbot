"use server";
import { validateChatWithUser } from "@/helpers/validation";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { Message } from "ai";
import { redirect } from "next/navigation";

export default async function findInitialMessagesByChatId(
  chatId?: string
): Promise<Message[]> {
  if (!chatId) {
    return [];
  }
  const { userId } = await auth();
  if (userId && !(await validateChatWithUser(chatId, userId))) {
    redirect("/404");
  }
  return (
    await prisma.message.findMany({
      where: {
        chatId: {
          equals: chatId,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  ).map((message) => ({
    id: message.id,
    content: message.text,
    role: message.sender == "BOT" ? "assistant" : "user",
  }));
}
