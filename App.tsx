import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { AuthContextProvider } from '@contexts/AuthContext';
import { Routes } from '@routes/index';

import { Loading } from '@components/Loading';

import { THEME } from '@theme/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      {!fontsLoaded && <Loading />}

      {fontsLoaded && (
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      )}
    </NativeBaseProvider>
  );
}
