import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SignInDTO } from '@dtos/SignInDTO';
import { useAuthContext } from '@hooks/useAuthContext';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import BackGroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

const singInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { singIn } = useAuthContext();

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInDTO>({
    resolver: yupResolver(singInSchema),
  });

  async function handleSingIn({ email, password }: SignInDTO) {
    try {
      setIsLoading(true);

      await singIn({ email, password });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível realizar o login. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });

      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackGroundImg}
          defaultSource={BackGroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine a sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading mb={6} color="gray.100" fontSize="xl" fontFamily="heading">
            Acesse a sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                placeholder="Senha"
                autoComplete="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSingIn)}
              />
            )}
          />

          <Button
            title="Acessar"
            isLoading={isLoading}
            onPress={handleSubmit(handleSingIn)}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={4}>
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
