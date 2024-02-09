import React from 'react';
import { MdClose } from 'react-icons/md';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import EventImage from '../../assets/toutix-home-bg.jpeg';

const CheckoutModal = ({ showModal, setShowModal }) => {
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
                src={EventImage}
                alt=""
                className="object-cover w-full h-40"
              />
              <div className="flex justify-between gap-4">
                <div className="flex flex-col">
                  <h3 className=""> Taylor Swift Concert</h3>
                  <p className="text-sm text-gray-400">Madison Square Garden</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 px-4 border border-blue-500 bg-blue-50">
                    30$
                  </div>
                  <p>x 3</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between gap-4 py-2">
                <p>Sub Total : </p>
                <p>90.00$</p>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <p>Platform Fee : </p>
                <p>9.00$</p>
              </div>
              <div className="flex justify-between gap-4 py-2 border-t-2 border-gray-200">
                <p>Total : </p>
                <p>99.00$</p>
              </div>
            </div>
            <button className="p-3 px-6 text-sm font-medium text-center text-white bg-blue-500 rounded-md">
              Proceed to Payment
            </button>
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default CheckoutModal;
