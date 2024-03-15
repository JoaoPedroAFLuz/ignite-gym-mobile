import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { useState } from 'react';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas');
  const groups = ['costas', 'peito', 'bíceps', 'tríceps', 'ombro', 'pernas'];
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Puxada de ombro',
    'Remada unilateral',
  ]);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        my={10}
        maxH={10}
        _contentContainerStyle={{ px: 8 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
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
            <ExerciseCard title={item} description="3 séries x 10 repetições" />
          )}
        />
      </VStack>
    </VStack>
  );
}
