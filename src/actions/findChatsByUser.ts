"use server";
import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function findChatsByUser() {
  const user = await currentUser();
  if (!user) {
    return [];
  }
  return await prisma.chat.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
