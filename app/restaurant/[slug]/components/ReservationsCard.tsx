"use client";

import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { partySize as partySizes, times } from "../../../../data";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import {
  convertToDisplayTime,
  Time,
} from "../../../../utils/convertToDisplayTime";

type ReservationsCardProps = {
  openTime: string;
  closeTime: string;
  slug: string;
};

const ReservationsCard = ({
  closeTime,
  openTime,
  slug,
}: ReservationsCardProps) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>(openTime);
  const [partySize, setPartySize] = useState<string>("2");
  const [day, setDay] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const getFilteredTimes = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }

      return timesWithinWindow;
    });

    return timesWithinWindow;
  };

  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="pb-2 font-bold text-center border-b">
          <h4 className="text-lg mr-7">Make a Reservation</h4>
        </div>
        <div className="flex flex-col my-3">
          <label htmlFor="">Party size</label>
          <select
            name=""
            className="py-3 font-light border-b"
            id=""
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            {partySizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleChangeDate}
              className="w-24 py-3 font-light border-b"
              dateFormat="MMMM d"
              wrapperClassName="w-[48%]"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 font-light border-b"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {getFilteredTimes().map((time) => (
                <option key={time.time} value={time.time}>
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" /> : "Find a Table"}
          </button>
        </div>
        {data && data.length ? (
          <div className="mt-4">
            <p className="text-reg">Select a Time</p>
            <div className="flex flex-wrap mt-2">
              {data.map((timeToSelect) =>
                timeToSelect.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${day}T${timeToSelect.time}&partySize=${partySize}`}
                    className="w-24 p-2 mb-3 mr-3 text-center text-white bg-red-600 rounded cursor-pointer"
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(timeToSelect.time as Time)}
                    </p>
                  </Link>
                ) : (
                  <p className="w-24 p-2 mb-3 mr-3 text-sm font-bold text-center bg-gray-300 rounded">
                    Full
                  </p>
                )
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationsCard;
