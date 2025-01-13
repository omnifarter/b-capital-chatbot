"use server";
import MessageForm from "@/components/MessageForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <>
      <MessageForm chatId={id} />
    </>
  );
}
