import { Center, Heading } from 'native-base';
import { Platform } from 'react-native';

interface ScreenHeaderProps {
  title: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <Center pb={6} pt={Platform.OS === 'ios' ? 16 : 8} bg="gray.600">
      <Heading fontSize="xl" color="gray.100">
        {title}
      </Heading>
    </Center>
  );
}
