import { HomeHeader } from '@components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { useState } from 'react';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas');
  const groups = ['costas', 'peito', 'bíceps', 'tríceps', 'ombro', 'pernas'];
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Puxada de ombro',
    'Remada unilateral',
  ]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('Exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        minH={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            {groups.length === 1 ? 'Exercício' : 'Exercícios'}
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard
              title={item}
              description="3 séries x 10 repetições"
              onPress={handleOpenExerciseDetails}
            />
          )}
        />
      </VStack>
    </VStack>
  );
}
