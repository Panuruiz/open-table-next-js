import {
  convertToDisplayTime,
  Time,
} from "../../../../utils/convertToDisplayTime";

type ReserveHeaderProps = {
  image: string;
  name: string;
  date: string;
  partySize: string;
};

const ReserveHeader = ({
  image,
  name,
  date,
  partySize,
}: ReserveHeaderProps) => {
  const [day, time] = date.split("T");

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="flex mt-5">
        <img
          src={image}
          alt={name}
          className="object-cover object-center w-32 h-32 bg-cover rounded"
        />
        <div className="ml-4">
          <h2 className="text-3xl font-bold">{name}</h2>
          <div className="flex mt-3">
            <p className="mr-6">{new Date(day).toDateString()}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveHeader;
