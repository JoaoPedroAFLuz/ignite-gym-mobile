import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Text, View } from 'react-native';

import { Loading } from '@components/Loading';
import { THEME } from '@theme/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded && <Loading />}

      {!fontsLoaded && (
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
      )}
    </NativeBaseProvider>
  );
}
