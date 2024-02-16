import React from 'react';

const CreateEvent = () => {
  return (
    <div className="w-screen">
      <div className="h-[80vh] bg-cover bg-no-repeat bg-center bg-home-bg-banner relative">
        <div className="absolute inset-0 grid p-4 sm:p-10 md:p-24 backdrop-filter backdrop-blur-sm place-items-center ">
          <h1 className="max-w-5xl font-semibold leading-[72px] lg:leading-[110px] text-center text-white text-6xl lg:text-8xl drop-shadow-lg ">
            CREATE EVENTS AND CREATE FUN
          </h1>
        </div>
      </div>
      <div className="px-4 py-20 bg-gray-300 sm:px-10 md:px-24">
        <div className="flex flex-col gap-10 mx-auto max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-normal">
              Create Events
            </h1>
            <p className="text-gray-500">Create the Event using below form.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
