import axios from "axios";
import { getCookie } from "cookies-next";
import { useContext } from "react";

import { AuthenticationContext } from "../app/context/AuthContext";

type SignInType = {
  email: string;
  password: string;
};

type SignUpDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
};

type SignUpType = {
  data: SignUpDataType;
  handleClose: () => void;
};

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signIn = async (
    { email, password }: SignInType,
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );

      setAuthState({ data: response.data, error: null, loading: false });
      return handleClose();
    } catch (error_: any) {
      return setAuthState({
        data: null,
        error: error_.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signUp = async (
    { city, email, firstName, lastName, password, phone }: SignUpType["data"],
    handleClose: SignUpType["handleClose"]
  ) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );

      setAuthState({ data: response.data, error: null, loading: false });
      return handleClose();
    } catch (error_: any) {
      return setAuthState({
        data: null,
        error: error_.response.data.errorMessage,
        loading: false,
      });
    }
  };

  return { signIn, signUp };
};

export default useAuth;
