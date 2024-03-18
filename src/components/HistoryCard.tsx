import { HStack, Heading, Text, VStack } from 'native-base';

export function HistoryCard() {
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
          Costas
        </Heading>

        <Text numberOfLines={1} color="gray.100" fontSize="lg">
          Puxada Frontal
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        08:56
      </Text>
    </HStack>
  );
}
