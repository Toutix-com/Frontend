import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { browserStorage } from '../../constants/storage';
import { setCredentials, toggleAuthModal } from '../../store/auth/authSlice';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { auth } from '../../utils/firebase';
import { showToastError, showToastSuccess } from '../../utils/toast';

const Login = ({ setTab }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([
    browserStorage.loginEmail,
    browserStorage.otpExpiry,
    browserStorage.accessToken
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

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const handleGoogleSignIn = async () => {
    // Handle sign-in with Google logic
    const res = await googleSignIn();
    if (!res.user) {
      showToastError('An error occurred while signing in with Google');
      return;
    }
    const email = res.user.email;
    const first_name = res.user.displayName.split(' ')[0];
    const last_name = res.user.displayName.split(' ')[1];
    setIsLoading(true);
    setError('');
    try {
      const { data } = await publicAxiosInstance.post('/auth/login', {
        email,
        is_social_login: true,
        first_name,
        last_name
      });
      showToastSuccess(data.message);

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
      setIsLoading(false);
      removeCookie(browserStorage.loginEmail);
      removeCookie(browserStorage.otpExpiry);

      if (data.first_name === '' || data.first_name === null) {
        setTab('name');
      } else {
        dispatch(toggleAuthModal(false));
      }

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

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-6 text-sm ">
      <label className="flex flex-col gap-1">
        <p className="pl-2">Email</p>

        <input
          type="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        {error && error.length > 0 && <p className="text-red-500">{error}</p>}
      </label>

      {/* Explanation note for users */}
      <p className="text-gray-600">
        New here? Don't worry! Click "Log In" to either sign up or log in. Our
        process is streamlined for both new and returning users.
      </p>

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
        className="flex items-center justify-center w-full gap-2 p-3 text-gray-700 border-2 border-blue-400 rounded-lg hover:bg-blue-50"
      >
        <FcGoogle className="text-2xl" /> Sign In with Google
      </button>
    </form>
  );
};

export default Login;
