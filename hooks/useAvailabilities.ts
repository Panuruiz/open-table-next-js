import { useState } from "react";
import axios from "axios";

type FetchAvailabilitiesProps = {
  slug: string;
  partySize: string;
  day: string;
  time: string;
};

type AvailabilitiesData =
  | {
      time: string;
      available: Boolean;
    }[]
  | null;

const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<AvailabilitiesData>(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: FetchAvailabilitiesProps) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, data, fetchAvailabilities };
};

export default useAvailabilities;
