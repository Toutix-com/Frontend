import React from 'react';
import EventImage from '../../assets/toutix-home-bg.jpeg';

const SingleEventDetails = () => {
  return (
    <div className="flex flex-col w-full max-w-3xl gap-8 mx-auto">
      <img className="w-full h-[300px] object-cover" src={EventImage} alt="" />
      <div className="flex flex-col gap-1 text-gray-600 ">
        <h2 className="text-2xl font-medium text-gray-800">Event</h2>
        <p className="text-sm font-light">Taylor Swift Concert</p>
      </div>

      <div className="flex flex-col gap-1 text-gray-600 ">
        <h2 className="text-2xl font-medium text-gray-800">Description</h2>
        <p className="text-sm font-light">
          Discover an array of engaging events, spanning from electrifying
          concerts to insightful workshops, providing memorable experiences
          suited for diverse interests and ages."
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Starts At</h2>
          <p className="text-sm font-light">06 Jan , 2024 , 09:PM PST</p>
        </div>{' '}
        <div className="flex flex-col gap-1 text-gray-600 ">
          <h2 className="text-2xl font-medium text-gray-800">Ends At</h2>
          <p className="text-sm font-light">07 Jan , 2024 , 04:AM PST </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-gray-600 ">
        <h2 className="text-2xl font-medium text-gray-800">Location</h2>
        <p className="text-sm font-light">Madison Square Garden</p>
      </div>
    </div>
  );
};

export default SingleEventDetails;
