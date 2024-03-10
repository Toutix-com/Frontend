import React from 'react';
import { MdClose } from 'react-icons/md';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter
} from 'tw-elements-react';

const ConfirmationModal = ({
  showModal,
  setShowModal,
  onConfirm,
  heading,
  subheading
}) => {
  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent>
          <div className="flex flex-col w-full max-w-2xl gap-6 p-8 mx-auto bg-gray-100 rounded-lg shadow-lg elative">
            {/* <!--Modal title--> */}
            <h5 className="text-xl font-medium leading-normal text-neutral-600">
              {heading}
            </h5>
            <p>{subheading}</p>
            <MdClose
              className="absolute cursor-pointer top-4 right-4"
              onClick={() => setShowModal(false)}
            />
            <div className="flex items-center gap-3">
              <TERipple rippleColor="light">
                <button
                  type="button"
                  onClick={onConfirm}
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Confirm
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
            </div>
            {/* <!--Close button--> */}
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default ConfirmationModal;
