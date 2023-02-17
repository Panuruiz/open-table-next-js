"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import { getCookie } from "cookies-next";
import axios from "axios";

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

export const AuthenticationContext = createContext<AuthState>({
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

  const fetchUser = async () => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        setAuthState({ data: null, error: null, loading: false });
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error) {
      setAuthState({ data: null, error: null, loading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
