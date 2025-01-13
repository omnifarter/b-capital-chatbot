import { Stack, Skeleton } from "@mantine/core";

const SkeletonMessage = () => (
  <Stack w="100%" h="100%" gap={32}>
    <Skeleton w="full" h={32} mt={64} />
    <Skeleton w="full" h={32} />
    <Skeleton w="full" h={32} />
    <Skeleton w="full" h={32} />
  </Stack>
);

export default SkeletonMessage;
