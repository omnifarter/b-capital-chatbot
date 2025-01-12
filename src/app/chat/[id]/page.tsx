import MessageForm from "@/components/MessageForm";
import getInitialMessages from "@/actions/findInitialMessagesByChatId";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl">Hello! How can I help you today?</h1>
        <MessageForm
          chatId={id}
          initialMessages={await getInitialMessages(id)}
        />
      </main>
    </div>
  );
}
