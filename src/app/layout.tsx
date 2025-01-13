"use client";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import {
  AppShell,
  Burger,
  Container,
  Group,
  MantineProvider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ChatList from "@/components/ChatList";
import "@mantine/core/styles.css";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const { id: chatId } = useParams();
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <ClerkProvider>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: !opened, mobile: !opened },
              }}
            >
              <ChatList activeChat={chatId} />
              <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                  <div>
                    <Burger opened={opened} onClick={toggle} size="sm" />
                  </div>
                  <div>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </Group>
              </AppShell.Header>
              <AppShell.Main>
                <Container h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - var(--app-shell-padding) * 2)">
                  {children}
                </Container>
              </AppShell.Main>
            </AppShell>
          </ClerkProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
