"use client";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ChangeEvent, useEffect, useState } from "react";
import AuthModalForm from "./AuthModalForm";
import useAuth from "../../hooks/useAuth";

type AuthModalProps = {
  isSignIn?: boolean;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: AuthModalProps) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  const { signIn } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    return setInputs({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
      password: "",
    });
  };

  const renderContentIfSignedIn = (
    signInContent: string,
    signUpContent: string
  ) => {
    return isSignIn ? signInContent : signUpContent;
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
      setDisabled(true);
    }

    if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.email &&
      inputs.city &&
      inputs.password
    ) {
      return setDisabled(false);
    }
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signIn(inputs.email, inputs.password);
      handleClose();
    }
  };
  return (
    <div>
      <button
        className={`p-1 px-4 mr-3 ${renderContentIfSignedIn(
          "text-white bg-blue-400",
          ""
        )} border rounded`}
        onClick={handleOpen}
      >
        {renderContentIfSignedIn("Sign in", "Sign up")}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="p-2">
              <div className="pb-2 mb-2 font-bold text-center uppercase border-b">
                {renderContentIfSignedIn("Sign in", "Create account")}
              </div>
              <div>
                <h2 className="mb-6 text-2xl font-light text-center">
                  {renderContentIfSignedIn(
                    "Log into your account",
                    "Create your OpenTable account"
                  )}
                </h2>
                <AuthModalForm
                  inputs={inputs}
                  isSignIn={isSignIn}
                  handleChangeInput={handleChangeInput}
                />
                <button
                  className="w-full p-3 mt-6 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContentIfSignedIn("Sign in", "Create account")}
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
