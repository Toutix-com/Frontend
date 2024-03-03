import React, { useEffect, useState } from 'react';
import SingleEventDetails from '../../components/single-event/SingleEventDetails';
import TicketSelect from '../../components/single-event/TicketSelect';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constants/routes';

const SingleEventPage = () => {
  const [event, setEvent] = useState([]); // Replace with your actual events data
  const [isLoading, setIsLoading] = useState(true); // Replace with your actual loading state
  const [ticketCategories, setTicketCategories] = useState([]); // Replace with your actual ticket categories data
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

  useEffect(() => {
    fetchEventsData();
    fetchEventTicketCategory();
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-1 gap-16 p-4 bg-gray-200 xl:grid-cols-2 sm:p-10 md:p-20">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SingleEventPage;
