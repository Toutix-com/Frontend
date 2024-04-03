import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import SingleMarketplaceEventDetails from '../../components/marketplace/SingleMarketplaceEventDetails';
import SingleMarketplaceTicket from '../../components/marketplace/SingleMarketplaceTicket';
import { routes } from '../../constants/routes';
import { publicAxiosInstance } from '../../utils/axiosConfig';

const MarketPlaceEvent = () => {
  const [event, setEvent] = useState([]); // Replace with your actual events data
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]); // Replace with your actual ticket categories data
  const [ticketLoading, setTicketLoading] = useState(true);
  const { eventID } = useParams();
  const navigate = useNavigate();

  const fetchEventsData = async () => {
    setIsLoading(true);
    try {
      const response = await publicAxiosInstance.get(`/events/${eventID}`);
      setEvent(response.data.event);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 404) {
        navigate(routes.marketplace);
      }
      setIsLoading(false);
    }
  };

  const fetchSingleMarketplaceEventTickets = async () => {
    setTicketLoading(true);
    try {
      const { data } = await publicAxiosInstance.get(`/market/${eventID}`);
      setTickets(data.tickets);
      setTicketLoading(false);
    } catch (err) {
      console.log(err);
      setTicketLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
    fetchSingleMarketplaceEventTickets();
  }, []);

  return (
    <div className="grid w-full min-h-screen grid-cols-1 gap-10 p-4 bg-gray-200 sm:p-10 md:p-20">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SingleMarketplaceEventDetails event={event} />{' '}
          <div className="bg-gray-200">
            <div className="flex flex-col gap-10 ">
              <div className="flex flex-col">
                <h1 className="text-4xl font-medium tracking-normal">
                  Market listing
                </h1>
                <p className="text-gray-500">
                  Find authentic tickets that is exclusively sold on our
                  platform.
                </p>
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {tickets.map((ticket) => (
                    <SingleMarketplaceTicket
                      key={ticket.TicketID}
                      ticket={ticket}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketPlaceEvent;
