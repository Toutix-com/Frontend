import React, { useMemo, useState } from 'react';
import CheckoutModal from '../checkout/CheckoutModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthModal } from '../../store/auth/authSlice';
import { activeCurrency } from '../../constants/currency';

const TicketSelect = ({ ticket, event }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const dispatch = useDispatch();
  const [numOfTicketSelected, setNumOfTicketSelected] = useState(0);

  const { name, description, price, max_limit, ticket_sold } = ticket;

  const maxNumberOfSeats = useMemo(
    () => Math.min(max_limit - ticket_sold, 10),
    [max_limit, ticket_sold]
  );

  const numOfSeatsLeft = useMemo(
    () => max_limit - ticket_sold,
    [max_limit, ticket_sold]
  );

  const handleCheckout = () => {
    if (!isLoggedIn) {
      dispatch(toggleAuthModal(true));
    } else {
      setShowCheckoutModal(true);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl capitalize">{name}</h2>
            <p className="text-gray-500">(1 Ticket)</p>
          </div>
          {numOfSeatsLeft > 0 && numOfSeatsLeft <= 10 && (
            <p className="text-sm font-medium text-red-500 ">
              Only {numOfSeatsLeft} seats left
            </p>
          )}
          {numOfSeatsLeft === 0 && (
            <p className="text-sm font-light text-red-400 ">Sold Out</p>
          )}
          <p className="text-sm font-light text-gray-400 ">{description}</p>
        </div>

        <div className="p-2 px-4 ml-auto border border-blue-500 bg-blue-50 max-w-max">
          {price}
          {activeCurrency}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-400">Select Number of Seats</p>
        <div className="flex flex-wrap items-center gap-2 ">
          {[...Array(maxNumberOfSeats).keys()].map((item, idx) => {
            const isActive = item + 1 <= numOfTicketSelected;
            const isDisabled = numOfSeatsLeft === 0;
            return (
              <div
                key={idx}
                onClick={() => !isDisabled && setNumOfTicketSelected(item + 1)}
                className={`p-2 px-3 text-sm  border  ${isActive ? 'border-blue-500 text-blue-500 bg-blue-100' : 'border-gray-500 text-gray-500 bg-gray-100'}  rounded-md cursor-pointer md:px-4 md:text-lg ${isDisabled && 'opacity-50'}`}
              >
                {item + 1}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={numOfSeatsLeft === 0 || numOfTicketSelected === 0}
        className="p-3 px-6 ml-auto text-sm font-medium text-center text-white bg-blue-500 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
      <CheckoutModal
        showModal={showCheckoutModal}
        setShowModal={setShowCheckoutModal}
        ticket={ticket}
        numOfTicketSelected={numOfTicketSelected}
        event={event}
      />
    </div>
  );
};

export default TicketSelect;
