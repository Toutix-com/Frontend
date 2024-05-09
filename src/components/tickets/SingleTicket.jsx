import { format } from 'date-fns';
import React, { useMemo, useRef, useState } from 'react';
import { activeCurrency } from '../../constants/currency';
import { ticketStatus } from '../../constants/ticket';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { getTicketPrice } from '../../utils/common';
import { showToastError, showToastSuccess } from '../../utils/toast';
import ConfirmationModal from '../common/ConfirmationModal';
import MarketplacePopup from './MarketplacePopup';

const SingleTicket = ({ ticket, isValidating = false, refetch = () => {} }) => {
  const { Category, Event, TicketID, Status, SeatNumber, Price, InitialPrice } =
    ticket;
  const { DateTime, Name, image_url, location } = Event;
  const [showMarketplacePopup, setShowMarketplacePopup] = useState(false);
  const [showConfirmDelistPopup, setShowConfirmDelistPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const eventStartDay = useMemo(
    () => format(new Date(DateTime), 'dd MMM,yyyy'),
    [DateTime]
  );
  const eventStartTime = useMemo(
    () => format(new Date(DateTime), 'hh:mm a'),
    [DateTime]
  );

  const componentRef = useRef();

  const handlePrintTicket = async () => {
    setIsPrinting(true);
    try {
      const { data } = await privateAxiosInstance.get(
        `/user/me/tickets/${TicketID}/download`
      );
      console.log(data);
      window.open(data, '_blank');
    } catch (err) {
      showToastError('Error while downloading ticket');
    } finally {
      setIsPrinting(false);
    }
  };

  const handleMarketplaceClick = () => {
    if (Status === ticketStatus.ListedonMarketplace) {
      setShowConfirmDelistPopup(true);
    } else if (Status === ticketStatus.Available) {
      setShowMarketplacePopup(true);
    }
  };

  const handleDelistFromMarketplace = async () => {
    setLoading(true);
    try {
      const { data } = await privateAxiosInstance.put(
        `/user/me/tickets/${ticket.TicketID}/delist`
      );
      if (data) {
        showToastSuccess('Ticket de-listed successfully');
      }
      setLoading(false);
      setShowConfirmDelistPopup(false);
      refetch();
    } catch (error) {
      console.error('Error:', error);
      if (
        error?.response &&
        (error?.response?.status === 400 || error?.response?.status === 404) &&
        error?.response?.data
      ) {
        showToastSuccess(error.response.data.error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="flex flex-col w-full max-w-[340px] gap-3 bg-white rounded-lg shadow ">
        <div
          ref={componentRef}
          className="flex flex-col w-full gap-3 p-5 bg-white rounded-t-lg"
        >
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
        {!isValidating && (
          <div className="flex flex-col gap-3 p-5 pt-0">
            {(Status === ticketStatus.Available ||
              Status === ticketStatus.ListedonMarketplace) && (
              <button
                onClick={handleMarketplaceClick}
                disabled={loading}
                className="w-full p-2 text-sm text-white bg-blue-500 rounded-lg "
              >
                {Status === ticketStatus.Available
                  ? 'List on Marketplace'
                  : Status === ticketStatus.ListedonMarketplace
                    ? 'Delist from Marketplace'
                    : ''}
              </button>
            )}

            <button
              onClick={handlePrintTicket}
              disabled={isPrinting}
              className="w-full p-2 text-sm text-blue-500 border border-blue-500 rounded-lg "
            >
              {isPrinting ? 'Downloading' : 'Download'} Ticket
            </button>
          </div>
        )}
      </div>
      <ConfirmationModal
        showModal={showConfirmDelistPopup}
        setShowModal={() => setShowConfirmDelistPopup(false)}
        heading={'Delist Ticket Confirmation'}
        subheading={'Are you sure?'}
        onConfirm={handleDelistFromMarketplace}
      />
      <MarketplacePopup
        showModal={showMarketplacePopup}
        setShowModal={setShowMarketplacePopup}
        event={Event}
        ticket={ticket}
        refetch={refetch}
      />
    </div>
  );
};

export default SingleTicket;
