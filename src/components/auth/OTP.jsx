import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { browserStorage } from '../../constants/storage';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { useCookies } from 'react-cookie';
import { showToastError, showToastSuccess } from '../../utils/toast';
import { useDispatch } from 'react-redux';
import { setCredentials, toggleAuthModal } from '../../store/auth/authSlice';

const ForgetPassword = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cookies, , removeCookie] = useCookies([browserStorage.loginEmail]);
  const dispatch = useDispatch();

  const validateOTP = (otp) => {
    const regex = /^\d+$/;
    return regex.test(otp);
  };

  const handleOTPValidation = async () => {
    if (!validateOTP(otp)) {
      setError('Enter a Valid OTP');
      return;
    }
    try {
      const email = cookies[browserStorage.loginEmail];
      if (!email) return;
      setIsLoading(true);
      const response = await publicAxiosInstance.post('/auth/validateOTP', {
        email,
        otp
      });
      setIsLoading(false);
      dispatch(
        setCredentials({
          email: response.data.email,
          userID: response.data.user_id,
          accessToken: response.data.access_token,
          first_time_login: response.data.first_time_login
        })
      );
      showToastSuccess(response.data.message);
      removeCookie(browserStorage.loginEmail);
      dispatch(toggleAuthModal(false));
    } catch (err) {
      console.log(err.message);
      if (err?.response?.status === 400 && err?.response?.data?.error) {
        showToastError(err?.response?.data?.error);
      }
      setIsLoading(false);
    }
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
        {error && error.length > 0 && <p className="text-red-500">{error}</p>}
      </div>

      <button
        onClick={handleOTPValidation}
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        {isLoading ? 'Validating...' : 'Validate'}
      </button>
    </div>
  );
};

export default ForgetPassword;
