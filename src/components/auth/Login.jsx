import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ setTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic
  };

  const handleForgotPassword = () => {
    setTab('reset');
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
      </label>
      <label className="flex flex-col gap-1">
        <p className="pl-2">Password*</p>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </label>

      <button
        onClick={handleSignIn}
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        Sign In
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full gap-2 p-3 text-gray-700 bg-blue-100 border border-blue-500 rounded-lg"
      >
        <FcGoogle className="text-2xl" /> Sign In with Google
      </button>
      <button
        onClick={handleForgotPassword}
        className="w-full mt-2 text-gray-500"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default Login;
