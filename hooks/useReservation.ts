import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

type CreateReservationProps = {
  slug: string;
  partySize: string;
  day: string;
  time: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerEmail: string;
  bookerPhone: string;
  bookerOccasion: string;
  bookerRequests: string;
  setDidBook: Dispatch<SetStateAction<boolean>>;
};

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerOccasion,
    bookerRequests,
    setDidBook,
  }: CreateReservationProps) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerEmail,
          bookerPhone,
          bookerOccasion,
          bookerRequests,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, createReservation };
};

export default useReservation;
