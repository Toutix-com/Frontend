import React from 'react';

const TicketSelect = ({ price, seatName, ticketName }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 rounded-md shadow-md">
      <div className="flex gap-6">
        <div className="flex flex-col gap-1 ">
          <h2 className="text-xl">{ticketName}</h2>
          <div className="p-2 px-4 border border-blue-500 bg-blue-50">
            {price}$
          </div>
        </div>
        <div className="flex flex-col flex-1 text-sm">
          <h2 className="text-xl">{seatName}</h2>
          <p className="text-gray-500">1 Ticket</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 ">
        {[...Array(10).keys()].map((item, idx) => (
          <div
            key={idx}
            className="p-2 px-3 text-sm text-gray-500 bg-gray-100 border border-gray-500 rounded-md cursor-pointer md:px-4 md:text-lg"
          >
            {item + 1}
          </div>
        ))}
      </div>
      <button className="p-3 px-6 ml-auto text-sm font-medium text-center text-white bg-blue-500 rounded-md">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default TicketSelect;
