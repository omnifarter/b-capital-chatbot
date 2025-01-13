import { AppShell, Skeleton, Stack } from "@mantine/core";

const SkeletonChat = () => {
  return (
    <AppShell.Navbar>
      <Stack h="100%" px="lg" dir="col">
        <Skeleton w="80%" h={32} mt={64} />
        <Skeleton w="95%" h={32} />
        <Skeleton w="95%" h={32} />
        <Skeleton w="95%" h={32} />
      </Stack>
    </AppShell.Navbar>
  );
};

export default SkeletonChat;
