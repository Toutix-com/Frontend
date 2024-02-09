import React, { useState } from 'react';
import { TEModal, TEModalContent, TEModalDialog } from 'tw-elements-react';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import { MdClose } from 'react-icons/md';

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
            <div className="flex justify-between mb-6">
              <button
                className={`mr-2 w-full px-4 py-2   ${
                  tab === 'signin'
                    ? ' text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-700'
                }`}
                onClick={() => setTab('signin')}
              >
                Sign In
              </button>
              <button
                className={`px-4 w-full py-2  ${
                  tab === 'signup'
                    ? ' text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-700'
                }`}
                onClick={() => setTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {tab === 'signin' && <Login setTab={setTab} tab={tab} />}

            {tab === 'signup' && <Signup setTab={setTab} tab={tab} />}

            {tab === 'reset' && <ForgetPassword setTab={setTab} tab={tab} />}
          </div>
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default AuthModal;
