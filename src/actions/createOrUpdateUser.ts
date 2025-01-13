"use server";
import { prisma } from "@/prisma";
import { UserJSON } from "@clerk/nextjs/server";

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
