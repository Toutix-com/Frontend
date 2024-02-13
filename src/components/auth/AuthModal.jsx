import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import Login from './Login';
import ForgetPassword from './OTP';

const AuthModal = ({ showModal, setShowModal }) => {
  const [tab, setTab] = useState('signin');

  return (
    <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
      <TEModalDialog centered>
        <TEModalContent>
          <div className="relative w-full p-8 mx-auto bg-gray-100 rounded-lg shadow-lg">
            <MdClose
              className="absolute cursor-pointer top-4 right-4"
              onClick={() => {
                setShowModal(false);
                setTab('signin');
              }}
            />

            {tab === 'signin' && <Login setTab={setTab} tab={tab} />}

            {tab === 'otp' && <ForgetPassword setTab={setTab} tab={tab} />}
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default AuthModal;
