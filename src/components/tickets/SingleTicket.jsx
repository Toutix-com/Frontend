import React from 'react';

const SingleTicket = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[360px] bg-gray-100 ">
      <div className="flex flex-col w-full gap-3 p-6 bg-white rounded-lg shadow-lg ">
        <h2 className="text-lg font-semibold ">Your Ticket</h2>

        <img
          className="object-cover h-40 "
          src="https://picsum.photos/200"
          alt=""
        />
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex justify-between ">
            <p className="text-gray-600">Event Name:</p>
            <p className="font-semibold text-gray-800">Sample Event</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-gray-600">Date:</p>
            <p className="font-semibold text-gray-800">January 1, 2023</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-gray-600">Time:</p>
            <p className="font-semibold text-gray-800">7:00 PM</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-gray-600">Seat No:</p>
            <p className="font-semibold text-gray-800">A12</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-gray-600">Price:</p>
            <p className="font-semibold text-gray-800">$25.00</p>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            className="w-32 h-32"
            src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=1024x1024&w=is&k=20&c=J3NoWzg4Y5x8x8tPjB-oscJ48ITem2axmKcX5lMusSU="
            alt="QR Code"
          />
        </div>
        <p className="text-sm text-gray-600">Scan QR code for entry</p>
      </div>
    </div>
  );
};

export default SingleTicket;
