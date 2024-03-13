import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { browserStorage } from '../../constants/storage';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { useCookies } from 'react-cookie';
import { showToastError, showToastSuccess } from '../../utils/toast';
import { useDispatch } from 'react-redux';
import { setCredentials, toggleAuthModal } from '../../store/auth/authSlice';

const OTPComponent = ({ setTab }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([
    browserStorage.loginEmail,
    browserStorage.accessToken,
    browserStorage.otpExpiry
  ]);
  const dispatch = useDispatch();

  const validateOTP = (otp) => {
    const regex = /^\d+$/;
    return regex.test(otp);
  };
  const email = cookies[browserStorage.loginEmail];

  const handleOTPValidation = async (e) => {
    e.preventDefault();
    if (!validateOTP(otp)) {
      setError('Enter a Valid OTP');
      return;
    }
    try {
      if (!email) return;
      setIsLoading(true);
      const { data } = await publicAxiosInstance.post('/auth/validateOTP', {
        email,
        otp
      });
      console.log(data);
      dispatch(
        setCredentials({
          email: data.email,
          userID: data.user_id,
          isFirstTimeLogin: data.first_time_login
        })
      );
      setCookie(browserStorage.accessToken, data.access_token, {
        path: '/',
        maxAge: 3600 * 24 * 7
      });
      showToastSuccess(data.message);
      setIsLoading(false);
      removeCookie(browserStorage.loginEmail);
      removeCookie(browserStorage.otpExpiry);
      if (data.first_name === '' || data.first_name === null) {
        setTab('name');
      } else {
        dispatch(toggleAuthModal(false));
      }
    } catch (err) {
      console.log(err.message);
      if (err?.response?.status === 400 && err?.response?.data?.error) {
        showToastError(err?.response?.data?.error);
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleOTPValidation}
      className="flex flex-col gap-6 text-sm "
    >
      <p className="text-center text-gray-600">Enter OTP sent to {email}</p>
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
        {error && error.length > 0 && <p className="text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        {isLoading ? 'Validating...' : 'Validate'}
      </button>
    </form>
  );
};

export default OTPComponent;
