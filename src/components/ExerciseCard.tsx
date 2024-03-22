import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Entypo } from '@expo/vector-icons';
import { api } from '@services/api';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO;
}

export function ExerciseCard({ exercise, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        mb={3}
        p={2}
        pr={4}
        rounded="md"
        alignItems="center"
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt="Foto do exercício"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading color="white" fontSize="lg" fontFamily="heading">
            {exercise.name}
          </Heading>

          <Text mt={1} color="gray.200" fontSize="sm" numberOfLines={2}>
            {`${exercise.series} séries x ${exercise.repetitions} repetições`}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
