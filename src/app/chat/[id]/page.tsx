"use server";
import MessageForm from "@/components/MessageForm";
import getInitialMessages from "@/actions/findInitialMessagesByChatId";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const messages = await getInitialMessages(id);
  return (
    <>
      <MessageForm chatId={id} initialMessages={messages} />
    </>
  );
}
