import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign-up logic
  };
  return (
    <div className="flex flex-col gap-6 text-sm">
      <label className="flex flex-col gap-1">
        <p className="pl-2">Name*</p>

        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </label>

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
        onClick={handleSignUp}
        className="w-full p-3 text-white bg-blue-500 rounded-md"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
