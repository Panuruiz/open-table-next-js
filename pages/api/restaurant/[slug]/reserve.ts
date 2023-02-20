import { NextApiRequest, NextApiResponse } from "next";

type ReserveDataQueryType = {
  slug: string;
  day: string;
  time: string;
  partySize: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query as ReserveDataQueryType;

  return res.status(200).json({
    slug,
    day,
    time,
    partySize,
  });
};

export default handler;

// Path: http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-08-01&time=18:00:00.000Z&partySize=2
