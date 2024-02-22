import React, { useEffect, useState } from 'react';
import SingleEventDetails from '../../components/single-event/SingleEventDetails';
import TicketSelect from '../../components/single-event/TicketSelect';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constants/routes';

const SingleEventPage = () => {
  const [event, setEvent] = useState([]); // Replace with your actual events data
  const [isLoading, setIsLoading] = useState(true); // Replace with your actual loading state
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

  useEffect(() => {
    fetchEventsData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-16 p-4 bg-gray-200 xl:grid-cols-2 sm:p-10 md:p-20">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SingleEventDetails event={event} />
          <div className="w-full max-w-3xl mx-auto ">
            <div className="flex scrollbar-hidden overflow-y-scroll flex-col h-[75vh] max-w-xl gap-6 mx-auto xl:ml-auto xl:mr-0 ">
              <TicketSelect
                price={30}
                seatName={'Rear Seats'}
                ticketName={'Starter'}
              />
              <TicketSelect
                price={100}
                seatName={'Front Seats'}
                ticketName={'Gold'}
              />
              <TicketSelect
                price={200}
                seatName={'VIP Seats'}
                ticketName={'Platinum'}
              />
              <TicketSelect
                price={250}
                seatName={'Celebrities Seats'}
                ticketName={'Diamond'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleEventPage;
