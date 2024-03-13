import { IPressableProps, Pressable, Text } from 'native-base';

interface GroupProps extends IPressableProps {
  name: string;
  isActive?: boolean;
}

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      borderColor="green.500"
      isPressed={isActive}
      _pressed={{ borderWidth: 1, borderColor: 'green.500' }}
      {...rest}
    >
      <Text
        color="gray.200"
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
}
