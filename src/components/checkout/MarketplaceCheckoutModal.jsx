import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { activeCurrency } from '../../constants/currency';
import { useNavigate } from 'react-router-dom';
import { showToastError } from '../../utils/toast';
import { getTicketPrice } from '../../utils/common';

const MarketplaceCheckoutModal = ({
  showModal,
  setShowModal,
  ticket,
  marketplaceListing,
  event
}) => {
  const [loading, setLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState({});
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { EventID, Name, image_url, location } = event;
  const { Name: LocationName } = location;
  const navigate = useNavigate();

  const getCheckoutDetails = async () => {
    try {
      const { data } = await privateAxiosInstance.post(
        `/market/${EventID}/validate`,
        {
          user_id: user.userID,
          ticket_id: ticket.TicketID
        }
      );

      if (data) {
        setCheckoutDetails(data);
        if (data.error_message?.length > 0) {
          setError(data.error_message);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      getCheckoutDetails();
    }
  }, [showModal]);

  const handleProceedToPayment = () => {
    if (checkoutDetails.is_eligible_to_purchase) {
      navigate(`/marketplace/events/${EventID}/checkout`, {
        state: {
          ticket,
          event,
          checkoutDetails
        }
      });
    }
  };

  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent>
          <div className="relative flex flex-col w-full max-w-2xl gap-6 p-8 mx-auto bg-gray-100 rounded-lg shadow-lg">
            <MdClose
              className="absolute cursor-pointer top-4 right-4"
              onClick={() => setShowModal(false)}
            />
            <div className="flex flex-col gap-3">
              <img
                src={image_url}
                alt=""
                className="object-cover w-full h-40"
              />
              <div className="flex justify-between gap-4">
                <div className="flex flex-col">
                  <h3 className="">{Name || ''}</h3>
                  <p className="text-sm text-gray-400">{LocationName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 px-4 border border-blue-500 bg-blue-50">
                    {activeCurrency}
                    {marketplaceListing ? ticket.Price : getTicketPrice(ticket)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {checkoutDetails.is_eligible_to_purchase ? (
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
                  ) : (
                    <div>
                      <p className="text-sm text-center text-red-500 ">
                        {error.length > 0
                          ? error
                          : 'Sorry, you are not eligible to purchase this ticket'}
                      </p>
                    </div>
                  )}

                  <button
                    disabled={!checkoutDetails?.is_eligible_to_purchase}
                    onClick={handleProceedToPayment}
                    className="w-full p-3 px-6 text-sm font-medium text-center text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Proceed to Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default MarketplaceCheckoutModal;
