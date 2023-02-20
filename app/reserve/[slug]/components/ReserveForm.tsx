"use client";

import { CircularProgress } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";

type ReserveFormProps = {
  slug: string;
  date: string;
  partySize: string;
};

const ReserveForm = ({ slug, date, partySize }: ReserveFormProps) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequests: "",
  });
  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleOnClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequests: inputs.bookerRequests,
      setDidBook,
    });
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [inputs]);

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div className="flex flex-col justify-center w-full text-center align-middle">
          <h3 className="text-lg font-bold">You are all booked up!</h3>
          <p className="font-semibold">Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="First name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Last name"
            name="bookerLastName"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
          />
          <input
            type="tel"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Phone number"
            name="bookerPhone"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
          />
          <input
            type="email"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Email"
            name="bookerEmail"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Requests (optional)"
            name="bookerRequests"
            value={inputs.bookerRequests}
            onChange={handleChangeInput}
          />
          <button
            className="w-full p-3 font-bold text-white bg-red-600 rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleOnClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default ReserveForm;
