"use client";
import { Message, useChat } from "ai/react";
import getInitialMessages from "../../actions/getInitialMessages";
interface MessageFormProps {
  chatId?: string;
  initialMessages?: Message[];
}
const MessageForm = ({ chatId, initialMessages }: MessageFormProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    body: {
      chatId,
    },
  });
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default MessageForm;
