import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';

import { useAuthContext } from '@hooks/useAuthContext';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuthContext();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {!user && <AuthRoutes />}

        {user && <AppRoutes />}
      </NavigationContainer>
    </Box>
  );
}
