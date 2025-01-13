"use client";
import findChatsByUser from "@/actions/findChatsByUser";
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
import { useEffect, useState } from "react";

interface ChatListProps {
  activeChat?: string;
}
const ChatList = ({ activeChat }: ChatListProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    const fetchChats = async () => {
      setChats(await findChatsByUser());
    };
    fetchChats();
  }, [activeChat]);
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
          <Button variant="subtle" style={{ width: "100%" }}>
            <Link href={`/`}>New chat</Link>
          </Button>
        </Container>
      </Stack>
    </AppShell.Navbar>
  );
};

export default ChatList;
