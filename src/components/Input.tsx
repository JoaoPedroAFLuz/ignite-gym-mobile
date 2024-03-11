import { IInputProps, Input as NativeBaseInput } from 'native-base';

export function Input(props: IInputProps) {
  return (
    <NativeBaseInput
      h={14}
      px={4}
      mb={4}
      bg="gray.700"
      color="gray.100"
      placeholderTextColor="gray.300"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      _focus={{
        backgroundColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...props}
    />
  );
}
