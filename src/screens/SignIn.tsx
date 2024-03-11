import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import BackGroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bgColor="gray.700"
    >
      <VStack flex={1} bg="gray.700" px={10}>
        <Image
          source={BackGroundImg}
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
            Acesse a sua conta
          </Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input placeholder="Senha" autoComplete="password" secureTextEntry />

          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={4}>
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" variant="outline" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
