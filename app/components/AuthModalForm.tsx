import React, { ChangeEvent } from "react";

type AuthModalFormProps = {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  isSignIn?: boolean;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthModalForm = ({
  handleChangeInput,
  inputs,
  isSignIn,
}: AuthModalFormProps) => {
  return (
    <div>
      {!isSignIn && (
        <div className="flex justify-between my-3 text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First name"
            value={inputs.firstName}
            onChange={handleChangeInput}
            name="firstName"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last name"
            value={inputs.lastName}
            onChange={handleChangeInput}
            name="lastName"
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          type="email"
          className="w-full p-2 py-3 border rounded"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChangeInput}
          name="email"
        />
      </div>
      {!isSignIn && (
        <div className="flex justify-between my-3 text-sm">
          <input
            type="tel"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone number"
            value={inputs.phone}
            onChange={handleChangeInput}
            name="phone"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            onChange={handleChangeInput}
            name="city"
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          type="password"
          className="w-full p-2 py-3 border rounded"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </div>
  );
};

export default AuthModalForm;
