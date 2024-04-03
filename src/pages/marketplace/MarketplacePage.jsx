import React, { useEffect, useState } from 'react';
import SingleMarketplaceEvent from '../../components/marketplace/SingleMarketplaceEvent';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { set } from 'date-fns';

const MarketplacePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data } = await publicAxiosInstance.get('/market/events');
      setEvents(data.events);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <div className="h-[40vh] bg-cover bg-no-repeat bg-left-bottom bg-marketplace-bg-banner relative">
        <div className="absolute inset-0 grid p-4 sm:p-10 md:p-24 backdrop-filter backdrop-blur-sm place-items-center ">
          <h1 className="max-w-5xl font-semibold leading-[72px] lg:leading-[110px] text-center text-white text-6xl drop-shadow-lg ">
            A Marketplace to Buy and Sell your Tickets
          </h1>
        </div>
      </div>
      <div className="h-full px-4 py-20 bg-gray-200 sm:px-10 md:px-24">
        <div className="flex flex-col gap-10 mx-auto max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-normal">
              Events Marketplace
            </h1>
            <p className="text-gray-500">
              Explore the Marketplace for all upcoming events
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              events.map((event) => (
                <SingleMarketplaceEvent key={event.EventID} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
