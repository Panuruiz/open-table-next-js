import { PrismaClient } from "@prisma/client";
import { table } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { findAvailableTables } from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    res.status(400).json({ message: "Invalid data provided" });
    return;
  }

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
    res.status(400).json({ message: "Invalid restaurant provided" });
    return;
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

  const availabilities = searchTimesWithTables
    .map((searchTimeWithTables) => {
      const sumSeats = searchTimeWithTables.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: searchTimeWithTables.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHours =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);

      const timeIsBeforeClosingHours =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHours && timeIsBeforeClosingHours;
    });

  return res.status(200).json(availabilities);
};

export default handler;
