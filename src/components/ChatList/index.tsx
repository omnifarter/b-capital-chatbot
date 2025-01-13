"use client";
import findChatsByUser from "@/actions/findChatsByUser";
import { ChatContext } from "@/app/layout";
import { useAuth } from "@clerk/nextjs";
import {
  AppShell,
  Button,
  Container,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Chat } from "@prisma/client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface ChatListProps {
  activeChat?: string;
}
const ChatList = ({ activeChat }: ChatListProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const chatRef = useContext(ChatContext);
  const { isSignedIn } = useAuth();
  useEffect(() => {
    const fetchChats = async () => {
      setChats(await findChatsByUser());
    };
    fetchChats();
  }, [isSignedIn, chatRef.current]);
  return (
    <AppShell.Navbar>
      <Stack style={{ height: "100%" }} dir="col">
        <Text size="lg" fw="bold" px="lg" py="md">
          Chats
        </Text>
        <ScrollArea>
          {chats.length == 0 && (
            <Text size="sm" c="gray" px="lg" py="md">
              Nothing here yet...
            </Text>
          )}
          {chats.map((chat) => (
            <NavLink
              href={`/chat/${chat.id}`}
              key={chat.id}
              component={Link}
              label={chat.title}
              active={activeChat == chat.id}
            />
          ))}
        </ScrollArea>
        <Container style={{ marginTop: "auto" }} mt="auto" w="100%" py="lg">
          <Button variant="subtle" w="100%" component={Link} href="/">
            New chat
          </Button>
        </Container>
      </Stack>
    </AppShell.Navbar>
  );
};

export default ChatList;
