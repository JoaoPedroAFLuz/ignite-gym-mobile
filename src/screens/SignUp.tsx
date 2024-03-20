import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import BackGroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const singUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  confirmPassword: yup
    .string()
    .required('Confirme a senha.')
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
});

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormDataProps>({
    resolver: yupResolver(singUpSchema),
  });

  async function handleSingUp(data: FormDataProps) {
    const response = await fetch('http://192.168.12.55:3333/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    console.log(json);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                placeholder="Nome"
                autoComplete="name"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="email"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                placeholder="Senha"
                autoComplete="password-new"
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.confirmPassword?.message}
                placeholder="Confirme a Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSingUp)}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSingUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={navigation.goBack}
        />
      </VStack>
    </ScrollView>
  );
}
