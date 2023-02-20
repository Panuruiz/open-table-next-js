import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

type ReserveDataQueryType = {
  slug: string;
  day: string;
  time: string;
  partySize: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query as ReserveDataQueryType;

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return res
      .status(400)
      .json({ message: "Restaurant is not open at that time" });
  }

  const searchTimesWithTables = await findAvailableTables({
    day,
    time,
    restaurant,
    res,
  });

  if (!searchTimesWithTables) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  const searchTimeWithTables = searchTimesWithTables.find((searchTime) => {
    return (
      searchTime.date.toISOString() === new Date(`${day}T${time}`).toISOString()
    );
  });

  if (!searchTimeWithTables) {
    return res.status(400).json({ message: "No availability, cannot book" });
  }

  return res.status(200).json({ searchTimeWithTables });
};

export default handler;

// Path: http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-08-01&time=18:00:00.000Z&partySize=2
