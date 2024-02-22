import { format } from 'date-fns';
import React, { useMemo } from 'react';

const SingleEventDetails = ({ event }) => {
  const { DateTime, Name, image_url, location, Description, EndTime } = event;

  const eventStartDay = useMemo(
    () => format(new Date(DateTime), 'dd MMM,yyyy hh:mm a'),
    [DateTime]
  );

  const eventEndDay = useMemo(
    () => format(new Date(EndTime), 'dd MMM,yyyy hh:mm a'),
    [EndTime]
  );
  return (
    <div className="flex flex-col w-full max-w-3xl gap-8 mx-auto">
      <img className="w-full h-[300px] object-cover" src={image_url} alt="" />
      <div className="flex flex-col gap-1 text-gray-600 ">
        <h2 className="text-2xl font-medium text-gray-800">Event</h2>
        <p className="text-sm font-light">{Name}</p>
      </div>

      <div className="flex flex-col gap-1 text-gray-600 ">
        <h2 className="text-2xl font-medium text-gray-800">Description</h2>
        <p className="text-sm font-light">{Description}</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Starts At</h2>
          <p className="text-sm font-light">{eventStartDay}</p>
        </div>
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Ends At</h2>
          <p className="text-sm font-light">{eventEndDay}</p>
        </div>
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Location</h2>
          <p className="text-sm font-light">
            {location?.Name} , {location?.Address}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Capacity</h2>
          <p className="text-sm font-light">{location?.Capacity}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleEventDetails;
