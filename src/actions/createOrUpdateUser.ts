"use server";
import { UserJSON } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createOrUpdateUser(data: UserJSON) {
  return await prisma.user.upsert({
    where: {
      id: data.id,
    },
    create: {
      id: data.id,
      email: data.email_addresses[0].email_address,
      name: `${data.first_name} ${data.last_name}`,
    },
    update: {
      email: data.email_addresses[0].email_address,
      name: `${data.first_name} ${data.last_name}`,
    },
  });
}
