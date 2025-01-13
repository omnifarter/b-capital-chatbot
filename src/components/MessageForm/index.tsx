"use client";
import { useUser } from "@clerk/nextjs";
import { useChat } from "ai/react";
import LoginDialog from "../LoginDialog";
import { useDisclosure } from "@mantine/hooks";
import { Card, Input, Skeleton, Stack, Text } from "@mantine/core";
import createChat from "@/actions/createChat";
import { createTitle } from "@/helpers";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { Chat } from "@prisma/client";
import { useRouter } from "next/navigation";
import findInitialMessagesByChatId from "@/actions/findInitialMessagesByChatId";
interface MessageFormProps {
  chatId?: string;
}
const MessageForm = ({ chatId }: MessageFormProps) => {
  const { isSignedIn } = useUser();
  const chatRef = useRef("");
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getInitialMessages = async () => {
      if (!chatId) {
        setLoading(false);
        return;
      }
      const messages = await findInitialMessagesByChatId(chatId);
      setMessages(messages);
      setLoading(false);
    };
    getInitialMessages();
  }, []);

  const onFinish = () => {
    if (!chatId && chatRef) {
      router.push(`/chat/${chatRef.current}`);
    }
  };
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      body: {
        chatId,
      },
      onFinish,
    });

  const showLoginIfNotAuthenticated = () => {
    if (isSignedIn) return;
    open();
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!chatId && chatRef) {
      const chat: Chat = await createChat(createTitle(input));
      chatRef.current = chat.id;
      handleSubmit(e, { body: { chatId: chat.id } });
      return;
    }
    handleSubmit(e);
  };
  if (loading) {
    return (
      <Stack w="100%" h="100%" gap={32}>
        <Skeleton w="full" h={32} mt={64} />
        <Skeleton w="full" h={32} />
        <Skeleton w="full" h={32} />
        <Skeleton w="full" h={32} />
      </Stack>
    );
  }
  return (
    <Stack h="100%" justify="space-between">
      {opened && <LoginDialog close={close} />}
      <Stack h="100%" mt="lg">
        {messages.map((m) => (
          <Card
            key={m.id}
            ml={m.role == "user" ? 48 : 0}
            mr={m.role == "assistant" ? 48 : 0}
            bg={m.role == "assistant" ? "blue.2" : "gray.2"}
            style={{
              borderRadius: `${
                m.role == "user" ? "24px 24px 0px 24px" : "24px 24px 24px 0px"
              }`,
            }}
            shadow="sm"
          >
            <Text style={{ textAlign: m.role == "user" ? "right" : "left" }}>
              {m.content}
            </Text>
          </Card>
        ))}
      </Stack>

      <form onSubmit={onSubmit}>
        <Input
          value={input}
          placeholder="Say something..."
          onFocus={showLoginIfNotAuthenticated}
          onChange={handleInputChange}
          mb="lg"
        />
      </form>
    </Stack>
  );
};

export default MessageForm;
