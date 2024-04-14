import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import ShareEvent from '../single-event/ShareEvent';

const SingleMarketplaceEventDetails = ({ event }) => {
  const {
    DateTime,
    Name,
    image_url,
    location,
    Description,
    EndTime,
    EntryRequirement
  } = event;
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  const eventStartDay = useMemo(
    () => format(new Date(DateTime), 'dd MMM,yyyy hh:mm a'),
    [DateTime]
  );

  const eventEndDay = useMemo(
    () => format(new Date(EndTime), 'dd MMM,yyyy hh:mm a'),
    [EndTime]
  );
  return (
    <div className="grid w-full grid-cols-1 gap-8 mx-auto md:grid-cols-2">
      <div className="relative h-[300px] ">
        <img className="w-full h-[300px] object-cover" src={image_url} alt="" />
        <div className="absolute bottom-4 right-4">
          <ShareEvent urlToShare={window.location.href} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Event</h2>
          <p className="text-sm font-light">{Name}</p>
        </div>

        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Description</h2>
          <p
            className={`text-sm font-light ${!showFullText ? 'line-clamp-3' : ''}`}
          >
            {/* Render text with line breaks */}
            {Description.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </p>
          <button
            onClick={toggleShowFullText}
            className="mr-auto text-sm text-blue-500 "
          >
            {showFullText ? 'See Less' : 'See More'}
          </button>
        </div>
        {EntryRequirement && (
          <div className="flex flex-col gap-1 text-gray-600 ">
            <h2 className="text-2xl font-medium text-gray-800">
              Entry Requirement
            </h2>
            <p className="text-sm font-light">{EntryRequirement}</p>
          </div>
        )}
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
    </div>
  );
};

export default SingleMarketplaceEventDetails;
