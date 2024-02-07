import React from 'react';
import SingleEventDetails from '../../components/single-event/SingleEventDetails';
import TicketSelect from '../../components/single-event/TicketSelect';

const SingleEventPage = () => {
  return (
    <div className="grid grid-cols-1 gap-16 p-4 bg-gray-200 xl:grid-cols-2 sm:p-10 md:p-20">
      <SingleEventDetails />
      <div className="w-full max-w-3xl mx-auto ">
        <div className="flex flex-col h-full max-w-xl gap-6 mx-auto xl:ml-auto xl:mr-0 rounded-xl">
          <TicketSelect
            price={30}
            seatName={'Rear Seats'}
            ticketName={'Starter'}
          />
          <TicketSelect
            price={100}
            seatName={'Front Seats'}
            ticketName={'Platinum'}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
