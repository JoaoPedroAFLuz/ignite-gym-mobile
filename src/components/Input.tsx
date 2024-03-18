import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from 'native-base';

interface InputProps extends IInputProps {
  errorMessage?: string;
  isInvalid?: boolean;
}

export function Input({
  errorMessage,
  isInvalid = false,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        h={14}
        px={4}
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
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
