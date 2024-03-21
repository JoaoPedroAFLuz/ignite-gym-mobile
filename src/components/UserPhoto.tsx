import { IImageProps, Image } from 'native-base';

import { useAuthContext } from '@hooks/useAuthContext';

import defaultUserAvatarImg from '@assets/userPhotoDefault.png';

interface UserPhotoProps extends IImageProps {
  size: number;
}

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  const { user } = useAuthContext();

  const userAvatar = user.avatar ? { uri: user.avatar } : defaultUserAvatarImg;

  return (
    <Image
      source={userAvatar}
      alt="Foto do usuário"
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}
