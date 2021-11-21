import { createContext, useContext } from "react";
import { User } from "../types/creds";

interface AuthContext {
  user: User;
}

const authContext = createContext<AuthContext | {}>({});

interface AuthProviderProps {
  user: User;
  children: any;
}

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  );
};

export const useAuth = () => {
  const { user } = useContext(authContext) as AuthContext;
  return { user };
};
