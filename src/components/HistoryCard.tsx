import { HStack, Heading, Text, VStack } from 'native-base';

import { HistoryDTO } from '@dtos/HistoryDTO';

interface HistoryCardProps {
  history: HistoryDTO;
}

export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      w="full"
      px={5}
      py={4}
      mt={3}
      bg="gray.600"
      rounded="md"
    >
      <VStack flex={1}>
        <Heading
          numberOfLines={1}
          textTransform="capitalize"
          color="white"
          fontSize="md"
          fontFamily="heading"
        >
          {history.group}
        </Heading>

        <Text numberOfLines={1} color="gray.100" fontSize="lg">
          {history.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {history.hour}
      </Text>
    </HStack>
  );
}
