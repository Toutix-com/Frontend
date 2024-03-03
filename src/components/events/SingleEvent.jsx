import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { activeCurrency } from '../../constants/currency';

const SingleEvent = ({ event }) => {
  const {
    DateTime,
    EventID,
    Name,
    image_url,
    location,
    cheapest_ticket_price
  } = event;
  const { Name: LocationName } = location;
  const navigate = useNavigate();

  const eventDay = useMemo(() => format(new Date(DateTime), 'dd'), [DateTime]);
  const eventMonth = useMemo(
    () => format(new Date(DateTime), 'MMM'),
    [DateTime]
  );
  const eventYear = useMemo(
    () => format(new Date(DateTime), 'yyyy'),
    [DateTime]
  );

  const handleEventCardClick = () => {
    navigate(`/events/${EventID}`);
  };
  return (
    <div
      onClick={handleEventCardClick}
      className="min-h-[300px] relative cursor-pointer "
    >
      <img src={image_url} alt="" className="object-cover w-full h-72" />
      <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-gray-800 to-transparent ">
        <div className="flex items-start justify-between px-8 text-xs ">
          <div className="flex flex-col items-center gap-1 p-4 text-center text-gray-200 bg-gray-800 bg-opacity-70 ">
            <h1 className="text-2xl font-bold text-white">{eventDay}</h1>
            <p>{eventMonth}</p>
            <p>{eventYear}</p>
          </div>
          <div className="flex items-center gap-2 p-4 text-center text-gray-200 bg-gray-800 bg-opacity-70 ">
            <p>Starting at</p>
            <h1 className="text-sm font-semibold text-white">
              {activeCurrency}
              {cheapest_ticket_price ?? 0}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 text-xs text-white">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm"> {Name ?? ''}</h3>
            <p className="text-gray-300">{LocationName ?? ''}</p>
          </div>
          <button className="p-2 px-3 bg-blue-500 rounded-full">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
