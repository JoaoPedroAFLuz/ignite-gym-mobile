import { yupResolver } from '@hookform/resolvers/yup';
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
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import * as yup from 'yup';

import { UserDTO } from '@dtos/UserDTO';
import { useAuthContext } from '@hooks/useAuthContext';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 32;
const ONE_MEGA_BYTE = 1024 * 1024;

const updateProfileSchema = yup.object({
  name: yup
    .string()
    .required('Nome obrigatório.')
    .min(3, 'Informe o nome completo.'),
  email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  oldPassword: yup
    .string()
    .min(8, 'A senha antiga deve conter no mínimo 8 caracteres.')
    .nullable()
    .transform((value) => (!!value ? value : (value = null))),
  newPassword: yup.string().when('oldPassword', {
    is: (field: any) => field,
    then: (schema) =>
      schema
        .required('A nova senha é obrigatória.')
        .min(8, 'A nova senha deve conter no mínimo 8 caracteres.')
        .nullable()
        .transform((value) => (!!value ? value : (value = null)))
        .notOneOf(
          [yup.ref('oldPassword')],
          'A nova senha deve ser diferente da senha antiga.'
        ),
  }),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('newPassword')],
      'A confirmação de senha deve ser igual a nova senha.'
    )
    .when('newPassword', {
      is: (field: any) => field,
      then: (schema) =>
        schema
          .nullable()
          .required('A confirmação de senha é obrigatória.')
          .transform((value) => (!!value ? value : (value = null))),
    }),
});

type UpdateProfile = yup.InferType<typeof updateProfileSchema>;

export function Profile() {
  const [isLoadingProfilePhoto, setIsLoadingProfilePhoto] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/JoaoPedroAFLuz.png'
  );

  const toast = useToast();
  const { user, updateUserProfile } = useAuthContext();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateProfile>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function handleUpdateProfile(data: UpdateProfile) {
    try {
      setIsUpdatingProfile(true);

      await api.put('/users', data);

      const userUpdated: UserDTO = {
        ...user,
        name: data.name,
      };

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar o perfil. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  async function handleUserPhotoSelect() {
    try {
      setIsLoadingProfilePhoto(true);

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
      setIsLoadingProfilePhoto(false);
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
            isLoaded={!isLoadingProfilePhoto}
          />

          {!isLoadingProfilePhoto && (
            <UserPhoto source={{ uri: userPhoto }} size={PHOTO_SIZE} />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text mt={2} mb={8} color="green.500" fontWeight="bold">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            rules={{ required: 'Nome obrigatório' }}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                errorMessage={errors.name?.message}
                onChangeText={onChange}
                placeholder="Nome"
                bg="gray.600"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ required: 'E-mail obrigatório' }}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                errorMessage={errors.email?.message}
                onChangeText={onChange}
                placeholder="E-mail"
                isDisabled
                bg="gray.600"
              />
            )}
          />

          <Heading
            mt={12}
            mb={2}
            alignSelf="flex-start"
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                errorMessage={errors.oldPassword?.message}
                onChangeText={onChange}
                placeholder="Senha antiga"
                secureTextEntry
                bg="gray.600"
              />
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                errorMessage={errors.newPassword?.message}
                onChangeText={onChange}
                placeholder="Nova senha"
                secureTextEntry
                bg="gray.600"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                errorMessage={errors.confirmPassword?.message}
                onChangeText={onChange}
                placeholder="Confirme a nova senha"
                secureTextEntry
                bg="gray.600"
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            isLoading={isUpdatingProfile}
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
