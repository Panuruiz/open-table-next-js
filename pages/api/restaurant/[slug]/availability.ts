import { PrismaClient } from "@prisma/client";
import { table } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";

type BookingTablesObjectType = {
	[key: string]: {
		[key: number]: true;
	};
};

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

	const searchTimes = times.find((t) => t.time === time)?.searchTimes; //JOKE: t.time = 17:00 o'clock xD!

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

	return res.status(200).json({
		searchTimes,
		bookings,
		bookingTablesObject,
		tables,
		searchTimesWithTables,
		availabilities,
	});
};

export default handler;
