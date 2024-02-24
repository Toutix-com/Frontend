import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FcGoogle } from 'react-icons/fc';
import { browserStorage } from '../../constants/storage';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { showToastError, showToastSuccess } from '../../utils/toast';

const Login = ({ setTab }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookie] = useCookies([
    browserStorage.loginEmail,
    browserStorage.otpExpiry
  ]);

  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // Replace with your actual sign-in logic
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please Enter a Valid email');
      return;
    }
    setIsLoading(true);
    setError('');
    setCookie(browserStorage.loginEmail, email);
    try {
      const { data } = await publicAxiosInstance.post('/auth/login', { email });
      console.log(data);
      showToastSuccess(data.message);
      alert('Please copy your OTP for now ' + data.otp);
      setCookie(browserStorage.otpExpiry, data.otp_expiry);
      setTab('otp');
      setIsLoading(false);
      // Handle the response data as needed
    } catch (err) {
      if (
        err?.response?.status &&
        err?.response?.status === 400 &&
        err?.response?.data?.error
      ) {
        showToastError(err?.response?.data?.error);
      } else {
        setError(err.message);
      }
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Handle sign-in with Google logic
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-6 text-sm ">
      <label className="flex flex-col gap-1">
        <p className="pl-2">Email*</p>

        <input
          type="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        {error && error.length > 0 && <p className="text-red-500">{error}</p>}
      </label>

      <button
        type={'submit'}
        disabled={email.length === 0 || !validateEmail(email)}
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full gap-2 p-3 text-gray-700 border-2 hover:bg-blue-50 border-blue-400 rounded-lg"
      >
        <FcGoogle className="text-2xl" /> Sign In with Google
      </button>
    </form>
  );
};

export default Login;
