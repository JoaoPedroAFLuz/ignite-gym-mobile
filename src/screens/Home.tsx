import { FlatList, VStack } from 'native-base';
import { useState } from 'react';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas');
  const groups = ['costas', 'peito', 'bíceps', 'tríceps', 'ombro', 'pernas'];

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
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />
    </VStack>
  );
}
