"use server";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function findChatsByUser() {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }
  return await prisma.chat.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
