import React from 'react';
import SingleMarketplaceEvent from '../../components/marketplace/SingleMarketplaceEvent';

const MarketplacePage = () => {
  return (
    <div className="w-screen">
      <div className="h-[80vh] bg-cover bg-no-repeat bg-center bg-home-bg-banner relative">
        <div className="absolute inset-0 grid p-4 sm:p-10 md:p-24 backdrop-filter backdrop-blur-sm place-items-center ">
          <h1 className="max-w-5xl font-semibold leading-[72px] lg:leading-[110px] text-center text-white text-6xl lg:text-8xl drop-shadow-lg ">
            PURCHASE TICKETS FOR EVENTS
          </h1>
        </div>
      </div>
      <div className="px-4 py-20 bg-gray-300 sm:px-10 md:px-24">
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
            <SingleMarketplaceEvent />
            <SingleMarketplaceEvent />
            <SingleMarketplaceEvent />
            <SingleMarketplaceEvent />
            <SingleMarketplaceEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
