import React, { useState } from 'react';
import Login from '../../components/auth/Login';
import OTPComponent from '../../components/auth/OTP';

const LoginPage = () => {
  const [tab, setTab] = useState('signin');

  return (
    <div className="grid w-full h-screen p-4 bg-center bg-no-repeat bg-cover md:p-10 lg:p-20 place-items-center bg-home-bg-banner">
      <div className="relative w-full max-w-lg p-4 py-8 mx-auto bg-gray-100 rounded-lg shadow-lg md:p-8">
        {tab === 'signin' && <Login setTab={setTab} tab={tab} />}

        {tab === 'otp' && <OTPComponent setTab={setTab} tab={tab} />}
      </div>
    </div>
  );
};

export default LoginPage;
