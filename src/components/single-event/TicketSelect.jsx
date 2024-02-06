import React from 'react';

const TicketSelect = () => {
  return (
    <div className="w-full max-w-3xl mx-auto ">
      <div className="flex flex-col h-full max-w-xl gap-6 p-6 mx-auto bg-gray-100 shadow-md xl:ml-auto xl:mr-0 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Starter</h2>
            <div className="p-2 px-4 border border-blue-500 bg-blue-50">
              30$
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
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Platinum</h2>
            <div className="p-2 px-4 border border-yellow-500 bg-yellow-50">
              100$
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
        </div>
        <div className="flex flex-col gap-2 mt-4 text-gray-600">
          <div className="flex items-center justify-between">
            <p>Sub Total : </p>
            <p>100$</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Platform Fee : </p>
            <p>10$</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total : </p>
            <p>110$</p>
          </div>
        </div>
        <button className="p-3 mt-auto text-lg font-medium text-center text-white bg-blue-500 rounded-md">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default TicketSelect;
