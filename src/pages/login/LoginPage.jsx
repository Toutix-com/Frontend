import React, { useState } from 'react';
import Login from '../../components/auth/Login';
import ForgetPassword from '../../components/auth/OTP';

const LoginPage = () => {
  const [tab, setTab] = useState('signin');

  return (
    <div
      style={{ height: `calc(100vh - 80px)` }}
      className="p-4 md:p-10 lg:p-20 grid place-items-center bg-cover bg-no-repeat bg-center bg-home-bg-banner "
    >
      <div className="relative w-full max-w-lg p-4 md:p-8 py-8 mx-auto bg-gray-100 rounded-lg shadow-lg">
        {tab === 'signin' && <Login setTab={setTab} tab={tab} />}

        {tab === 'otp' && <ForgetPassword setTab={setTab} tab={tab} />}
      </div>
    </div>
  );
};

export default LoginPage;
