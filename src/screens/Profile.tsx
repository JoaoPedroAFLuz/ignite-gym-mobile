import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 32;

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 36 }}
        automaticallyAdjustKeyboardInsets
      >
        <Center mt={6} px={10}>
          <Skeleton
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded="full"
            startColor="gray.500"
            endColor="gray.400"
            isLoaded={!isLoading}
          />

          {!isLoading && <UserPhoto size={PHOTO_SIZE} />}

          <TouchableOpacity>
            <Text mt={2} mb={8} color="green.500" fontWeight="bold">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />

          <Input placeholder="E-mail" isDisabled bg="gray.600" />

          <Heading
            mt={12}
            mb={2}
            alignSelf="flex-start"
            color="gray.200"
            fontSize="md"
          >
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" secureTextEntry bg="gray.600" />

          <Input placeholder="Nova senha" secureTextEntry bg="gray.600" />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
