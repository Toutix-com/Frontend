import React from 'react';
import { useNavigate } from 'react-router';
import EventImage from '../../assets/toutix-home-bg.jpeg';
import { activeCurrency } from '../../constants/currency';

const SingleMarketplaceEvent = () => {
  const navigate = useNavigate();
  const handleEventCardClick = () => {
    navigate(`/marketplace/events/123`);
  };
  return (
    <div
      onClick={handleEventCardClick}
      className="min-h-[300px] relative cursor-pointer "
    >
      <img src={EventImage} alt="" className="object-cover w-full h-full" />
      <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-gray-800 to-transparent ">
        <div className="flex items-start justify-between px-8 text-xs ">
          <div className="flex flex-col items-center gap-1 p-4 text-center text-gray-200 bg-gray-800 bg-opacity-70 ">
            <h1 className="text-2xl font-bold text-white">06</h1>
            <p>Jan</p>
            <p>2024</p>
          </div>
          <div className="flex items-center gap-2 p-4 text-center text-gray-200 bg-gray-800 bg-opacity-70 ">
            <p>Starting at</p>
            <h1 className="text-sm font-semibold text-white">
              {activeCurrency}30
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 text-xs text-white">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm"> Taylor Swift Concert</h3>
            <p className="text-gray-300">Madison Square Garden</p>
          </div>
          <button className="p-2 px-3 bg-blue-500 rounded-full">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMarketplaceEvent;
