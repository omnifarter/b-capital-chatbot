"use server";
import MessageForm from "@/components/MessageForm";
import getInitialMessages from "@/actions/findInitialMessagesByChatId";
import { Container, Group } from "@mantine/core";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <>
      <MessageForm chatId={id} initialMessages={await getInitialMessages(id)} />
    </>
  );
}
