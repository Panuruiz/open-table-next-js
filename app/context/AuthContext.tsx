"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import type { ReactNode } from "react";

type AuthContextProps = {
  children: ReactNode;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
};

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: AuthContextProps) => {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
