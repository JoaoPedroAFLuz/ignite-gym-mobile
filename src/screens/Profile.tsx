import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 32;
const ONE_MEGA_BYTE = 1024 * 1024;

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/JoaoPedroAFLuz.png'
  );

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      setIsLoading(true);

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
          { size: true }
        );

        if (
          photoInfo.exists &&
          photoInfo.size &&
          photoInfo.size > ONE_MEGA_BYTE * 5
        ) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma imagem de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

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

          {!isLoading && (
            <UserPhoto source={{ uri: userPhoto }} size={PHOTO_SIZE} />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
