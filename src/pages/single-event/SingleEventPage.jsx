import React from 'react';
import SingleEventDetails from '../../components/single-event/SingleEventDetails';
import TicketSelect from '../../components/single-event/TicketSelect';

const SingleEventPage = () => {
  return (
    <div className="grid grid-cols-1 gap-16 p-4 bg-gray-200 xl:grid-cols-2 sm:p-10 md:p-20">
      <SingleEventDetails />
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
    </div>
  );
};

export default SingleEventPage;
