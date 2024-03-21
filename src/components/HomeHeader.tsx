import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { useAuthContext } from '@hooks/useAuthContext';

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const { user } = useAuthContext();

  const userFirstName = user.name.split(' ')[0];

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

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
