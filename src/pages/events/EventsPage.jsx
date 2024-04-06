import React, { useEffect, useState } from 'react';
import SingleEvent from '../../components/events/SingleEvent';
import { publicAxiosInstance } from '../../utils/axiosConfig';

const EventsPage = () => {
  const [events, setEvents] = useState([]); // Replace with your actual events data
  const [isLoading, setIsLoading] = useState(true); // Replace with your actual loading state

  const fetchEventsData = async () => {
    setIsLoading(true);
    try {
      const response = await publicAxiosInstance.get('/events');
      setEvents(response.data.events ?? []);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  return (
    <div className="w-screen">
      <div className="h-[80vh] bg-cover bg-no-repeat bg-center bg-home-bg-banner relative">
        <div className="absolute inset-0 grid p-4 sm:p-10 md:p-24 backdrop-filter backdrop-blur-sm place-items-center ">
          <h1 className="max-w-5xl font-semibold leading-[72px] lg:leading-[110px] text-center text-white text-6xl lg:text-8xl drop-shadow-lg ">
            BOOK YOUR TICKETS FOR EVENTS
          </h1>
        </div>
      </div>
      <div className="px-4 py-20 bg-gray-300 sm:px-10 md:px-24">
        <div className="flex flex-col gap-10 mx-auto max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-normal">
              Events Testing
            </h1>
            <p className="text-gray-500">Don't miss on any events</p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {isLoading ? (
              <div className="flex items-center justify-center col-span-3">
                <p>Loading...</p>
              </div>
            ) : (
              events.map((event) => (
                <SingleEvent key={event.EventID} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
