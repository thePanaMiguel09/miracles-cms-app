import { createContext, PropsWithChildren, useContext, useState } from "react";

import { User } from "@/domain/entities/user";
import { LoginUseCase } from "@/domain/usecases/loginUseCase";

import { AuthDatasourceImp } from "@/infraestructure/datasources/authDatasourceImp";
import { AuthRepositoryImp } from "@/infraestructure/repositories/authRepositoryImp";

enum AuthStatus {
  checking,
  authenticated,
  unauthenticated,
}

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  isChecking: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState(AuthStatus.checking);
  const [user, setUser] = useState<User>();

  const datasource = new AuthDatasourceImp();
  const repository = new AuthRepositoryImp(datasource);
  const loginUseCase = new LoginUseCase(repository);

  const login = async (email: string, password: string) => {
    const loggedUser = await loginUseCase.excute(email, password);
    setUser(loggedUser.user);
    setStatus(AuthStatus.authenticated);
  };

  const logOut = () => {
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        token: undefined,
        user,
        isChecking: status === AuthStatus.checking,
        isAuthenticated: status === AuthStatus.authenticated,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
