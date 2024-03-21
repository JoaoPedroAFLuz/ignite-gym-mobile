import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';

import { useAuthContext } from '@hooks/useAuthContext';

import { Loading } from '@components/Loading';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuthContext();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {!user.id && <AuthRoutes />}

        {user.id && <AppRoutes />}
      </NavigationContainer>
    </Box>
  );
}
