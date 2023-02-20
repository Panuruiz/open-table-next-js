import { PrismaClient, Table } from "@prisma/client";
import { times } from "../../data";
import { NextApiResponse } from "next";

type FindAvailableTablesProps = {
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
  time: string;
  day: string;
  res: NextApiResponse;
};

type BookingTablesObjectType = {
  [key: string]: {
    [key: number]: true;
  };
};

const prisma = new PrismaClient();

export const findAvailableTables = async ({
  restaurant,
  time,
  day,
  res,
}: FindAvailableTablesProps) => {
  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    res.status(400).json({ message: "Invalid time provided" });
    return;
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      booking_time: true,
      number_of_people: true,
      tables: true,
    },
  });

  const bookingTablesObject: BookingTablesObjectType = {};

  bookings.forEach((booking) => {
    bookingTablesObject[booking.booking_time.toISOString()] =
      booking.tables.reduce((object, table) => {
        return {
          ...object,
          [table.table_id]: true,
        };
      }, {});
  });

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((searchTimeWithTables) => {
    searchTimeWithTables.tables.filter((table) => {
      if (bookingTablesObject[searchTimeWithTables.date.toISOString()]) {
        if (
          bookingTablesObject[searchTimeWithTables.date.toISOString()][table.id]
        ) {
          return false;
        }
      }

      return true;
    });
  });

  return searchTimesWithTables;
};
