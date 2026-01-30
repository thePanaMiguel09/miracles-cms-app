import { User } from "@/domain/entities/user";
import { LoginUseCase } from "@/domain/usecases/loginUseCase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthDatasourceImp } from "@/infraestructure/datasources/authDatasourceImp";
import { UserModel } from "@/infraestructure/models/userModel";
import { AuthRepositoryImp } from "@/infraestructure/repositories/authRepositoryImp";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "../libs/verifyToken";

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

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const loggedUser = await loginUseCase.excute(email, password);
    await AsyncStorage.setItem("token", loggedUser.token);
    setUser(loggedUser.user);
    setStatus(AuthStatus.authenticated);
  };

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setStatus(AuthStatus.unauthenticated);
        return;
      }

      if (verifyToken(token)) {
        setStatus(AuthStatus.unauthenticated);
        logOut();
        return;
      }

      const tokenDecoded = jwtDecode<any>(token);
      const userModel = UserModel.fromJSON(tokenDecoded.user);
      setUser(userModel.toEntityUser());
      setStatus(AuthStatus.authenticated);
    } catch (error) {
      await AsyncStorage.removeItem("token");
      setStatus(AuthStatus.unauthenticated);
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    setUser(undefined);
    setStatus(AuthStatus.unauthenticated);
    return;
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
