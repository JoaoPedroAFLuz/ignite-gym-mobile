import { createContext, ReactNode, useEffect, useState } from 'react';

import { SignInDTO } from '@dtos/SignInDTO';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { storageUserGet, storageUserSave } from '@storage/storageUser';

export interface AuthContextDataProps {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  singIn: (data: SignInDTO) => Promise<void>;
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

  async function singIn(data: SignInDTO) {
    try {
      const response = await api.post('/sessions', data);

      const { user } = response.data;

      if (!user.id) {
        return;
      }

      setUser(user);
      storageUserSave(user);
    } catch (error) {
      throw error;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
