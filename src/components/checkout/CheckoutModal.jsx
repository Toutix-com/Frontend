import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { activeCurrency } from '../../constants/currency';

const CheckoutModal = ({
  showModal,
  setShowModal,
  ticket,
  numOfTicketSelected,
  event
}) => {
  const [loading, setLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { EventID, Name, image_url, location } = event;

  const { Name: LocationName } = location;

  const getCheckoutDetails = async () => {
    try {
      const { data } = await privateAxiosInstance.post(
        `/events/${EventID}/ticket/validate`,
        {
          user_id: user.userID,
          ticket_category_id: ticket.CategoryID,
          number_of_tickets: numOfTicketSelected
        }
      );
      console.log(data);
      if (data) {
        setCheckoutDetails(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      getCheckoutDetails();
    }
  }, [showModal]);

  const handleProceedToPayment = () => {};

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
                    {ticket.price}
                    {activeCurrency}
                  </div>
                  <p>x {numOfTicketSelected}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-4 py-2">
                      <p>Sub Total : </p>
                      <p>90.00{activeCurrency}</p>
                    </div>
                    <div className="flex justify-between gap-4 py-2">
                      <p>Platform Fee : </p>
                      <p>9.00{activeCurrency}</p>
                    </div>
                    <div className="flex justify-between gap-4 py-2 border-t-2 border-gray-200">
                      <p>Total : </p>
                      <p>99.00{activeCurrency}</p>
                    </div>
                  </div>
                  <button className="w-full p-3 px-6 text-sm font-medium text-center text-white bg-blue-500 rounded-md">
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

export default CheckoutModal;
