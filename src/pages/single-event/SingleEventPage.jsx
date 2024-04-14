import React, { useEffect, useState } from 'react';
import SingleEventDetails from '../../components/single-event/SingleEventDetails';
import TicketSelect from '../../components/single-event/TicketSelect';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constants/routes';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane
} from 'tw-elements-react';

const SingleEventPage = () => {
  const [event, setEvent] = useState([]); // Replace with your actual events data
  const [isLoading, setIsLoading] = useState(true); // Replace with your actual loading state
  const [ticketCategories, setTicketCategories] = useState([]); // Replace with your actual ticket categories data
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
        navigate(routes.home);
      }
      setIsLoading(false);
    }
  };

  const fetchEventTicketCategory = async () => {
    try {
      const { data } = await publicAxiosInstance.get(
        `/events/${eventID}/ticket/categories`
      );
      if (data.ticket_categories) {
        setTicketCategories(data.ticket_categories);
      }
    } catch (err) {
      console.log(err);
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
    fetchEventTicketCategory();
  }, []);

  return (
    <div className="grid min-h-screen p-4 bg-gray-200 sm:p-10 md:p-20">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="hidden grid-cols-1 gap-16 md:grid xl:grid-cols-2">
            <SingleEventDetails event={event} />
            <div className="w-full max-w-3xl mx-auto ">
              <div className="flex flex-col max-w-xl gap-6 mx-auto xl:ml-auto xl:mr-0 ">
                {ticketCategories.map((ticketCategory) => (
                  <TicketSelect
                    key={ticketCategory.CategoryID}
                    ticket={ticketCategory}
                    event={event}
                  />
                ))}
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
                <SingleEventDetails event={event} />
              </TETabsPane>
              <TETabsPane show={basicActive === 'ticket'}>
                <div className="w-full max-w-3xl mx-auto ">
                  <div className="flex flex-col max-w-xl gap-6 mx-auto xl:ml-auto xl:mr-0 ">
                    {ticketCategories.map((ticketCategory) => (
                      <TicketSelect
                        key={ticketCategory.CategoryID}
                        ticket={ticketCategory}
                        event={event}
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

export default SingleEventPage;
