import React, { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import { activeCurrency } from '../../constants/currency';
import { ticketStatus } from '../../constants/ticket';
import Slider from 'react-input-slider';
import {
  getTicketPrice,
  getTotalPrice,
  isEventActive
} from '../../utils/common';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { showToastInfo, showToastSuccess } from '../../utils/toast';
import { set } from 'date-fns';

const MarketplacePopup = ({
  setShowModal,
  showModal,
  event,
  ticket,
  refetch = () => {}
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { EventID, DateTime, Name, image_url, location } = event;
  const { Name: LocationName } = location;

  const [marketplacePrice, setMarketplacePrice] = useState(
    getTicketPrice(ticket)
  );

  const canListOnMarketplace = useMemo(() => {
    return ticket?.Status === ticketStatus.Available || isEventActive(DateTime);
  }, [DateTime, ticket?.Status]);

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setMarketplacePrice(newValue);
  };

  const handleListOnMarketplace = async () => {
    setLoading(true);
    try {
      const { data } = await privateAxiosInstance.put(
        `/user/me/tickets/${ticket.TicketID}/list_on_marketplace`,
        {
          price: marketplacePrice
        }
      );
      if (data) {
        showToastSuccess('Ticket listed on marketplace successfully');
        showToastInfo(
          "Ticket Listed! If sold, you'll receive credits usable for future purchases or cash out through customer support."
        );
      }
      setLoading(false);
      refetch();
      setShowModal(false);
    } catch (error) {
      console.error('Error:', error);
      if (
        error?.response &&
        (error?.response?.status === 400 || error?.response?.status === 404) &&
        error?.response?.data
      ) {
        showToastSuccess(error.response.data.error);
      }
      setLoading(false);
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
            <div className="flex flex-col gap-4">
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
                    {getTicketPrice(ticket)}
                    {activeCurrency}
                  </div>
                </div>
              </div>

              <label className="flex flex-col gap-2">
                <p>Enter Listing Price</p>
                <input
                  type="range"
                  min={Math.max(2, getTicketPrice(ticket))}
                  max={2 * getTicketPrice(ticket)}
                  step="0.5"
                  value={marketplacePrice}
                  onChange={handleSliderChange}
                />
                <div className="flex items-center justify-between gap-2">
                  <p>
                    {parseFloat(marketplacePrice).toFixed(2)}
                    {activeCurrency}
                  </p>{' '}
                  <p>
                    {parseFloat(getTicketPrice(ticket) * 2).toFixed(2)}
                    {activeCurrency}
                  </p>{' '}
                </div>
                {/* Display the current value */}
              </label>

              <button
                onClick={handleListOnMarketplace}
                disabled={loading}
                className="w-full p-2 text-sm text-white bg-blue-500 rounded-lg "
              >
                {loading ? 'Listing...' : 'List on Marketplace'}
              </button>

              {/* {canListOnMarketplace && (
                <button
                  onClick={handleListOnMarketplace}
                  className="w-full p-2 text-sm text-white bg-blue-500 rounded-lg "
                >
                  List on Marketplace
                </button>
              )} */}
            </div>
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default MarketplacePopup;
