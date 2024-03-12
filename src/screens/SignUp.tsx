import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import BackGroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

export function SignUp() {
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.goBack();
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
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crei sua conta
          </Heading>

          <Input placeholder="Nome" autoComplete="name" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            placeholder="Senha"
            autoComplete="password-new"
            secureTextEntry
          />

          <Input placeholder="Confirme a Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleSignIn}
        />
      </VStack>
    </ScrollView>
  );
}
