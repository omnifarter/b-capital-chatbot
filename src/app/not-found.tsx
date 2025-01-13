import { Container, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack h="100%" w="100%" justify="center" align="center">
      <Title>Not Found</Title>
      <Text>Could not find requested resource</Text>
      <Link href="/">Return Home</Link>
    </Stack>
  );
}
