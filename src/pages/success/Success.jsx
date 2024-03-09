import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userID = useMemo(() => user?.userID, [user]);

  const navigateToTickets = () => {
    navigate(`/users/${userID}/tickets`);
  };

  return (
    <div className="bg-gray-200 ">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-neutral-900">
          Payment Successful
        </h1>
        <button
          onClick={navigateToTickets}
          className="px-4 py-2 mt-4 font-semibold text-white rounded-md bg-primary-500"
        >
          View Tickets
        </button>
      </div>
    </div>
  );
};

export default Success;
