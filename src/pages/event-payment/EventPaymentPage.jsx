import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import { activeCurrency } from '../../constants/currency';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const EventPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState({});
  console.log(location.state);

  const createPaymentIntent = async () => {
    const { ticket, numOfTicketSelected, event } = location.state;
    try {
      const { data } = await privateAxiosInstance.post(
        `/payment/intent/events/ticket`,
        {
          user_id: user.userID,
          ticket_category_id: ticket.CategoryID,
          number_of_tickets: numOfTicketSelected,
          event_id: event.EventID
        }
      );
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
      //   navigate(`/events/${event.EventID}`);
      setLoading(false);
    }
  };

  const getCheckoutDetails = async () => {
    const { ticket, numOfTicketSelected, event } = location.state;
    try {
      const { data } = await privateAxiosInstance.post(
        `/events/${event.EventID}/ticket/validate`,
        {
          user_id: user.userID,
          ticket_category_id: ticket.CategoryID,
          number_of_tickets: numOfTicketSelected
        }
      );

      if (data) {
        setCheckoutDetails(data);
        if (data.is_eligible_to_purchase) {
          createPaymentIntent();
        } else {
          navigate(`/events/${event.EventID}`);
        }

        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) getCheckoutDetails();
    else navigate('/');
  }, [location.state]);
  const paymentElementOptions = {
    layout: 'tabs'
  };
  return (
    <div className="flex min-h-screen gap-10 p-4 bg-gray-100 sm:p-10 md:p-16 ">
      <div className="relative flex flex-col w-full max-w-2xl gap-6 p-8 mx-auto bg-gray-100">
        <div className="flex flex-col gap-3">
          <img
            src={location.state.event.image_url}
            alt=""
            className="object-cover w-full h-40"
          />
          <div className="flex justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="">{location.state.event.Name || ''}</h3>
              <p className="text-sm text-gray-400">
                {location.state.event.LocationName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 px-4 border border-blue-500 bg-blue-50">
                {location.state.ticket.price}
                {activeCurrency}
              </div>
              <p>x {location.state.numOfTicketSelected}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <>
            <div className="flex flex-col">
              <div className="flex justify-between gap-4 py-2">
                <p>Sub Total : </p>
                <p>
                  {checkoutDetails?.total?.toFixed(2)}
                  {activeCurrency}
                </p>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <p>Platform Fee : </p>
                <p>
                  {checkoutDetails?.service?.toFixed(2)}
                  {activeCurrency}
                </p>
              </div>
              <div className="flex justify-between gap-4 py-2 border-t-2 border-gray-200">
                <p>Total : </p>
                <p>
                  {(checkoutDetails?.total + checkoutDetails?.service).toFixed(
                    2
                  )}
                  {activeCurrency}
                </p>
              </div>
            </div>
          </>
        </div>
      </div>
      {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
    </div>
  );
};

export default EventPaymentPage;
