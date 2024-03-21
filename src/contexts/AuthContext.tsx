import { createContext, ReactNode, useEffect, useState } from 'react';

import { SignInDTO } from '@dtos/SignInDTO';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { storageAuthTokenSave } from '@storage/storageAuthToken';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser';

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

  async function storageUserAndAuthToken(user: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);

      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function singIn(data: SignInDTO) {
    try {
      const response = await api.post('/sessions', data);

      const { user, token } = response.data;

      if (!user.id || !token) {
        throw new Error();
      }

      storageUserAndAuthToken(user, token);
    } catch (error) {
      throw error;
    }
  }

  async function singOut() {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);

      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const user = await storageUserGet();

      if (!user.id) {
        return;
      }

      setUser(user);
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
