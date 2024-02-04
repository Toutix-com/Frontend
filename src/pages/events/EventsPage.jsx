import React from 'react';
import SingleEvent from '../../components/events/SingleEvent';

const EventsPage = () => {
  return (
    <div className="w-screen">
      <div className="h-[80vh] bg-cover bg-no-repeat bg-center bg-home-bg-banner relative">
        <div className="absolute inset-0 grid p-24 backdrop-filter backdrop-blur-sm place-items-center ">
          <h1 className="max-w-5xl font-semibold leading-[72px] lg:leading-[110px] text-center text-white text-6xl lg:text-8xl drop-shadow-lg ">
            BOOK YOUR TICKETS FOR EVENTS
          </h1>
        </div>
      </div>
      <div className="p-24 bg-gray-300">
        <div className="flex flex-col gap-10 mx-auto max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-normal">Events</h1>
            <p className="text-gray-500">Don't miss on any events</p>
          </div>
          <div className="grid w-full grid-cols-3 gap-6">
            <SingleEvent />
            <SingleEvent />
            <SingleEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
