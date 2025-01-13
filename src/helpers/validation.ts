import { prisma } from "@/prisma";

export const validateChatWithUser = async (chatId: string, userId: string) => {
  return !!(await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId: userId,
    },
  }));
};
