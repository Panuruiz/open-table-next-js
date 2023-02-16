import axios from "axios";

type SignInType = {
  email: string;
  password: string;
};

const useAuth = () => {
  const signIn = async (
    email: SignInType["email"],
    password: SignInType["password"]
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email: email,
          password: password,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = () => {};

  return { signIn, signUp };
};

export default useAuth;
