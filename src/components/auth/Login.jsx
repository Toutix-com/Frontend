import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FcGoogle } from 'react-icons/fc';
import { browserStorage } from '../../constants/storage';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { showToastError } from '../../utils/toast';

const Login = ({ setTab }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookie] = useCookies([browserStorage.loginEmail]);

  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // Replace with your actual sign-in logic
  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setError('Please Enter a Valid email');
      return;
    }
    setIsLoading(true);
    setError('');
    setCookie(browserStorage.loginEmail, email);
    try {
      const response = await publicAxiosInstance.post('/auth/login', { email });
      if (!response.ok) {
        throw new Error('Error signing in');
      }
      console.log(response.data);
      setTab('otp');
      setIsLoading(false);
      // Handle the response data as needed
    } catch (err) {
      if (err.response.status === 400 && err.response.data.error) {
        showToastError(err.response.data.error);
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
    <div className="flex flex-col gap-6 text-sm ">
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
        onClick={handleSignIn}
        disabled={email.length === 0 || !validateEmail(email)}
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full gap-2 p-3 text-gray-700 border-2 hover:bg-blue-50 border-blue-400 rounded-lg"
      >
        <FcGoogle className="text-2xl" /> Sign In with Google
      </button>
    </div>
  );
};

export default Login;
