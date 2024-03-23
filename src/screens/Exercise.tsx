import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import BodySVG from '@assets/body.svg';
import RepetitionSVG from '@assets/repetitions.svg';
import SeriesSVG from '@assets/series.svg';

interface RouteParamsProps {
  exerciseId: string;
}

export function Exercise() {
  const [isLoadingExerciseDetails, setIsLoadingExerciseDetails] =
    useState(true);
  const [isRegisteringExercise, setIsRegisteringExercise] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>();

  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleExerciseRegister() {
    try {
      setIsRegisteringExercise(true);

      await api.post('/history', { exercise_id: exerciseId });

      toast.show({
        title: 'Parabéns! Exercício concluído.',
        placement: 'top',
        bgColor: 'green.700',
      });

      handleGoBack();
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível marcar exercício como realizado. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsRegisteringExercise(false);
    }
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoadingExerciseDetails(true);

      const { data } = await api.get(`exercises/${exerciseId}`);

      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoadingExerciseDetails(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  if (!exercise || isLoadingExerciseDetails) {
    return <Loading />;
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
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySVG />

            <Text ml={1} color="gray.200" textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Box rounded="lg" mb={3} overflow="hidden">
          <Image
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
            }}
            alt="Foto do exercício"
            w="full"
            h={80}
            rounded="lg"
            resizeMode="cover"
          />
        </Box>

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
                {`${exercise.series} Séries`}
              </Text>
            </HStack>

            <HStack alignItems="center">
              <RepetitionSVG />

              <Text ml={2} color="gray.200" fontSize="sm">
                {`${exercise.repetitions} Repetições`}
              </Text>
            </HStack>
          </HStack>

          <Button
            title="Marcar como realizado"
            isLoading={isRegisteringExercise}
            onPress={handleExerciseRegister}
          />
        </Box>
      </VStack>
    </VStack>
  );
}
