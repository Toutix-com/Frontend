import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../../components/checkout/PaymentForm';
import { activeCurrency } from '../../constants/currency';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { showToastError } from '../../utils/toast';
import { stripePromise } from '../event-payment/EventPaymentPage';
import { getTicketPrice } from '../../utils/common';

const MarketplacePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null);

  const createPaymentIntent = async () => {
    const { ticket, resalePrice, event } = location.state;
    try {
      const { data } = await privateAxiosInstance.post(
        `/payment/intent/marketplace/ticket`,
        {
          user_id: user.userID,
          ticket_category_id: ticket.CategoryID,
          ticket_id: ticket.TicketID,
          event_id: event.EventID,
          resale_price: ticket.Price ?? 0
        }
      );

      if (data) {
        console.log(data);
        setPaymentDetails(data);
      }
    } catch (error) {
      console.error('Error:', error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data
      ) {
        showToastError(error.response.data.error);
      }
      navigate(`/marketplace/events/${event.EventID}`);
      setLoading(false);
    }
  };

  const getCheckoutDetails = async () => {
    const { ticket, event } = location.state;
    try {
      const { data } = await privateAxiosInstance.post(
        `/market/${event.EventID}/validate`,
        {
          user_id: user.userID,
          ticket_id: ticket.TicketID
        }
      );

      if (data) {
        setCheckoutDetails(data);
        if (data.is_eligible_to_purchase) {
          createPaymentIntent();
        } else {
          showToastError(
            data.error_message.length > 0
              ? data.error_message
              : 'You are not eligible to purchase this ticket'
          );
          navigate(`/marketplace/events/${event.EventID}`);
        }

        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data
      ) {
        showToastError(error.response.data.error);
      }
      navigate(`/marketplace/events/${event.EventID}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) getCheckoutDetails();
    else navigate('/');
  }, [location.state]);

  const appearance = {
    theme: 'stripe'
  };
  const options = {
    clientSecret: paymentDetails?.clientSecret,
    appearance
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-10 md:p-16">
      <div className="flex flex-col w-full gap-6 mx-auto lg:flex-row lg:gap-16 max-w-7xl">
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
                  {activeCurrency}
                  {getTicketPrice(location.state.ticket)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <>
              <div className="flex flex-col">
                <div className="flex justify-between gap-4 py-2">
                  <p>Sub Total : </p>
                  <p>
                    {activeCurrency}
                    {parseFloat(checkoutDetails?.total)?.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <p>Platform Fee : </p>
                  <p>
                    {activeCurrency}
                    {parseFloat(checkoutDetails?.service)?.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-4 py-2 border-t-2 border-gray-200">
                  <p>Total : </p>
                  <p>
                    {activeCurrency}
                    {(
                      parseFloat(checkoutDetails?.total) +
                      parseFloat(checkoutDetails?.service)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="w-full max-w-xl">
          {' '}
          {paymentDetails && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm clientSecret={paymentDetails?.clientSecret} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePayment;
