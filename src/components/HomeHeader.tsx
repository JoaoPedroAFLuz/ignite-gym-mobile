import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, Icon, Text, VStack, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { useAuthContext } from '@hooks/useAuthContext';
import { AppError } from '@utils/AppError';

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const { user, singOut } = useAuthContext();

  const toast = useToast();

  const userFirstName = user.name.split(' ')[0];

  async function handleSingOut() {
    try {
      await singOut();
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível realizar o logout. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return (
    <HStack alignItems="center" pt={4} pb={5} px={8} bg="gray.600" safeAreaTop>
      <UserPhoto size={16} mr={4} />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {userFirstName}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSingOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
