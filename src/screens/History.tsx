import { useFocusEffect } from '@react-navigation/native';
import { Heading, SectionList, Text, useToast, VStack } from 'native-base';
import { useCallback, useState } from 'react';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

export function History() {
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoadingHistory(true);

      const { data } = await api.get('/history');

      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o histórico de exercícios. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoadingHistory(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      {isLoadingHistory && <Loading />}

      {!isLoadingHistory && (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => <HistoryCard history={item} />}
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
      )}
    </VStack>
  );
}
