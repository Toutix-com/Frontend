import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import Login from './Login';
import OTPComponent from './OTP';
import Name from './Name';

const AuthModal = ({ showModal, setShowModal, enableClose }) => {
  const [tab, setTab] = useState('signin');

  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent>
          <div className="relative w-full p-8 mx-auto text-black bg-gray-100 rounded-lg shadow-lg">
            {enableClose && (
              <MdClose
                className="absolute cursor-pointer top-4 right-4"
                onClick={() => {
                  setShowModal(false);
                  setTab('signin');
                }}
              />
            )}

            {tab === 'signin' && <Login setTab={setTab} tab={tab} />}

            {tab === 'otp' && <OTPComponent setTab={setTab} tab={tab} />}

            {tab === 'name' && <Name tab={tab} setTab={setTab} />}
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default AuthModal;
