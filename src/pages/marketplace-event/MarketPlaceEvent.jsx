import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import SingleMarketplaceEventDetails from '../../components/marketplace/SingleMarketplaceEventDetails';
import SingleMarketplaceTicket from '../../components/marketplace/SingleMarketplaceTicket';
import { routes } from '../../constants/routes';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane
} from 'tw-elements-react';

const MarketPlaceEvent = () => {
  const [event, setEvent] = useState([]); // Replace with your actual events data
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]); // Replace with your actual ticket categories data
  const [ticketLoading, setTicketLoading] = useState(true);
  const [basicActive, setBasicActive] = useState('event');
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

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  useEffect(() => {
    fetchEventsData();
    fetchSingleMarketplaceEventTickets();
  }, []);

  return (
    <div className="w-full min-h-screen gap-10 p-4 bg-gray-200 sm:p-10 md:p-20">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="hidden grid-cols-1 gap-10 md:grid ">
            {' '}
            <SingleMarketplaceEventDetails event={event} />{' '}
            <div className="bg-gray-200">
              <div className="flex flex-col gap-10 ">
                <div className="flex flex-col">
                  <h1 className="text-4xl font-medium tracking-normal">
                    Market listing
                  </h1>
                  <p className="text-gray-500">
                    Find authentic tickets that are exclusively sold on our
                    platform.
                  </p>
                </div>
                {ticketLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="grid w-full grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tickets.map((ticket) => (
                      <SingleMarketplaceTicket
                        key={ticket.TicketID}
                        ticket={ticket}
                        marketplaceListing={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <TETabs>
              <TETabsItem
                onClick={() => handleBasicClick('event')}
                active={basicActive === 'event'}
                color="primary"
              >
                Description
              </TETabsItem>
              <TETabsItem
                onClick={() => handleBasicClick('ticket')}
                active={basicActive === 'ticket'}
                color="primary"
              >
                Tickets
              </TETabsItem>
            </TETabs>

            <TETabsContent>
              <TETabsPane show={basicActive === 'event'}>
                <SingleMarketplaceEventDetails event={event} />{' '}
              </TETabsPane>
              <TETabsPane show={basicActive === 'ticket'}>
                <div className="flex flex-col w-full max-w-3xl gap-4 mx-auto ">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-medium tracking-normal">
                      Market listing
                    </h1>
                    <p className="text-sm text-gray-500">
                      Find authentic tickets that are exclusively sold on our
                      platform.
                    </p>
                  </div>
                  <div className="flex flex-col max-w-xl gap-6 mx-auto xl:ml-auto xl:mr-0 ">
                    {tickets.map((ticket) => (
                      <SingleMarketplaceTicket
                        key={ticket.TicketID}
                        ticket={ticket}
                      />
                    ))}
                  </div>
                </div>
              </TETabsPane>
            </TETabsContent>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketPlaceEvent;
