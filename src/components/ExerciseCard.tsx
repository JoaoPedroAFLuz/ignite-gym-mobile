import { Entypo } from '@expo/vector-icons';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ExerciseCardProps extends TouchableOpacityProps {
  title: string;
  description: string;
}

export function ExerciseCard({
  title,
  description,
  ...rest
}: ExerciseCardProps) {
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
            uri: 'https://static.tuasaude.com/media/article/ll/ae/puxada-frontal_63648_l.jpg',
          }}
          alt="Foto do exercício"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            {title}
          </Heading>

          <Text mt={1} fontSize="sm" color="gray.200" numberOfLines={2}>
            {description}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
