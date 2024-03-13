import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { activeCurrency } from '../../constants/currency';
import { getTicketPrice } from '../../utils/common';
import MarketplaceCheckoutModal from '../checkout/MarketplaceCheckoutModal';

const SingleMarketplaceTicket = ({ ticket }) => {
  const { Category, Event, TicketID, Status, SeatNumber, Price, InitialPrice } =
    ticket;
  const { DateTime, Name, image_url, location } = Event;
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const eventStartDay = useMemo(
    () => format(new Date(DateTime), 'dd MMM,yyyy'),
    [DateTime]
  );
  const eventStartTime = useMemo(
    () => format(new Date(DateTime), 'hh:mm a'),
    [DateTime]
  );
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="flex flex-col w-full max-w-[340px] gap-3 bg-white rounded-lg shadow ">
        <div className="flex flex-col w-full gap-3 p-5 bg-white rounded-t-lg">
          <h2 className="text-lg font-semibold ">Ticket</h2>

          <img className="object-cover h-40 " src={image_url} alt="" />
          <div className="flex flex-col flex-1 gap-2 text-xs">
            <div className="flex justify-between gap-2 ">
              <p className="text-gray-600">Event Name:</p>
              <p className="font-semibold text-gray-800">{Name}</p>
            </div>
            <div className="flex justify-between gap-2 ">
              <p className="text-gray-600">Date:</p>
              <p className="font-semibold text-gray-800">{eventStartDay}</p>
            </div>
            <div className="flex justify-between gap-2 ">
              <p className="text-gray-600">Time:</p>
              <p className="font-semibold text-gray-800">{eventStartTime}</p>
            </div>
            {SeatNumber && (
              <div className="flex justify-between gap-2 ">
                <p className="text-gray-600">Seat No:</p>
                <p className="font-semibold text-gray-800">A12</p>
              </div>
            )}
            {location && (
              <div className="flex justify-between gap-2 ">
                <p className="text-gray-600">Location:</p>
                <p className="font-semibold text-right text-gray-800">
                  {location?.Name} , {location?.Address}
                </p>
              </div>
            )}

            <div className="flex justify-between gap-2 ">
              <p className="text-gray-600">Price:</p>
              <p className="font-semibold text-gray-800">
                {activeCurrency}
                {getTicketPrice(ticket)}
              </p>
            </div>
          </div>

          <div className="relative w-full my-4 border-t-4 border-gray-500 border-dashed border-opacity-20 ">
            <div className="absolute left-0 w-8 h-8 transform -translate-x-8 -translate-y-1/2 bg-gray-200 rounded-full "></div>
            <div className="absolute right-0 w-8 h-8 transform translate-x-8 -translate-y-1/2 bg-gray-200 rounded-full "></div>
          </div>
        </div>
        <div className="p-5 pt-0">
          <button
            onClick={() => setShowCheckoutPopup(true)}
            className="w-full p-2 text-white bg-blue-500 rounded-lg"
          >
            Purchase
          </button>
        </div>
        <MarketplaceCheckoutModal
          showModal={showCheckoutPopup}
          setShowModal={setShowCheckoutPopup}
          ticket={ticket}
          event={Event}
        />
      </div>
    </div>
  );
};

export default SingleMarketplaceTicket;
