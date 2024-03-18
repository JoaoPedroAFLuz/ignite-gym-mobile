import { Heading, SectionList, Text, VStack } from 'native-base';
import { useState } from 'react';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '15.03.2024',
      data: ['Rosca Barra W', 'Rosca Concentrada', 'Rosca Scott'],
    },
    {
      title: '14.03.2024',
      data: ['Tríceps Pulley', 'Tríceps Corda', 'Tríceps Unilateral'],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        stickySectionHeadersEnabled={false}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            mt={10}
            mb={3}
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        ListEmptyComponent={() => (
          <Text textAlign="center" color="gray.100">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        px={4}
      />
    </VStack>
  );
}
