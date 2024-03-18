import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';

import BodySVG from '@assets/body.svg';
import RepetitionSVG from '@assets/repetitions.svg';
import SeriesSVG from '@assets/series.svg';

export function Exercise() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack pt={4} pb={8} px={8} bg="gray.600" safeAreaTop>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
        </TouchableOpacity>

        <HStack mt={4} justifyContent="space-between">
          <Heading
            flexShrink={1}
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
          >
            Puxada Frontal
          </Heading>

          <HStack alignItems="center">
            <BodySVG />

            <Text ml={1} color="gray.200" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            source={{
              uri: 'https://static.tuasaude.com/media/article/ll/ae/puxada-frontal_63648_l.jpg',
            }}
            alt="Foto do exercício"
            w="full"
            h={80}
            mb={3}
            rounded="lg"
            resizeMode="cover"
          />

          <Box pb={4} px={8} bg="gray.600" rounded="md">
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mt={5}
              mb={6}
            >
              <HStack alignItems="center">
                <SeriesSVG />

                <Text ml={2} color="gray.200" fontSize="sm">
                  3
                </Text>

                <Heading
                  ml={2}
                  color="gray.200"
                  fontSize="md"
                  fontFamily="heading"
                >
                  Séries
                </Heading>
              </HStack>

              <HStack alignItems="center">
                <RepetitionSVG />

                <Text ml={2} color="gray.200" fontSize="sm">
                  10
                </Text>

                <Heading
                  ml={2}
                  color="gray.200"
                  fontSize="md"
                  fontFamily="heading"
                >
                  Repetições
                </Heading>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
