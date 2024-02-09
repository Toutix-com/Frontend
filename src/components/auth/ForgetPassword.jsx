import React, { useState } from 'react';
import OTPInput from 'react-otp-input';

const ForgetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    //handle reset password logic
  };

  return (
    <div className="flex flex-col gap-6 text-sm ">
      <p className="text-center text-gray-600">
        Enter OTP sent to abcd@email.com
      </p>
      <div className="mx-auto">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mx-2">-</span>}
          renderInput={(props) => <input className="p-3" {...props} />}
          inputStyle={{
            border: '1px solid transparent',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            fontSize: '12px',
            fontWeight: '400',
            caretColor: 'blue'
          }}
          focusStyle={{
            border: '1px solid #CFD3DB',
            outline: 'none'
          }}
        />
      </div>
      <label className="flex flex-col gap-1">
        <p className="pl-2">New Password*</p>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="flex flex-col gap-1">
        <p className="pl-2">Confirm Password*</p>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </label>

      <button
        onClick={handleResetPassword}
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        Reset Password
      </button>
    </div>
  );
};

export default ForgetPassword;
