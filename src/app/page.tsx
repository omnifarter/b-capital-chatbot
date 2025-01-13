import MessageForm from "@/components/MessageForm";
import { Stack, Title } from "@mantine/core";

export default async function Home() {
  return (
    <Stack h="100%">
      <Title mt="lg" style={{ textAlign: "center" }}>
        Hello! How can I help you today?
      </Title>
      <MessageForm />
    </Stack>
  );
}
