import { Text, View } from 'react-native';

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202024',
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Text style={{ color: '#fff' }}>Hello World!</Text>
    </View>
  );
}
