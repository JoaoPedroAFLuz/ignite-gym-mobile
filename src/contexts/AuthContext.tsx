import { createContext, ReactNode, useEffect, useState } from 'react';

import { SignInDTO } from '@dtos/SignInDTO';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';
import { AppError } from '@utils/AppError';

export interface AuthContextDataProps {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  singIn: (data: SignInDTO) => Promise<void>;
  singOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);
  const [user, setUser] = useState({} as UserDTO);

  async function saveUserAndAuthToken(user: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);

      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  function updateUserAndAuthToken(user: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(user);
  }

  async function singIn(data: SignInDTO) {
    try {
      const response = await api.post('/sessions', data);

      const { user, token } = response.data;

      if (!user.id || !token) {
        throw new AppError(
          'Erro interno no servidor. Tente novamente mais tarde.'
        );
      }

      await saveUserAndAuthToken(user, token);

      updateUserAndAuthToken(user, token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function singOut() {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const user = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (!user.id || !token) {
        return;
      }

      updateUserAndAuthToken(user, token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        singIn,
        singOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
