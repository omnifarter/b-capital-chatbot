"use server";
import { prisma } from "@/prisma";
import { currentUser, UserJSON } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function createChat(title: string) {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  return await prisma.chat.create({
    data: {
      title,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
}
