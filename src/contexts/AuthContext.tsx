import { createContext, ReactNode } from 'react';

import { UserDTO } from 'src/dto/UserDTO';

export interface AuthContextDataProps {
  user: UserDTO;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'João Pedro Fortunato',
          email: 'joao.pedro.luz@hotmail.com',
          avatar: 'https://github.com/JoaoPedroAFLuz.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
