import React, { useState } from 'react';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { showToastError, showToastSuccess } from '../../utils/toast';
import { useDispatch } from 'react-redux';
import { toggleAuthModal } from '../../store/auth/authSlice';

const Name = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleNameUpdate = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const { data } = await privateAxiosInstance.put('/user/me/update', {
        LastName: lastName,
        FirstName: firstName
      });
      console.log(data);
      showToastSuccess(data.message);
      setIsLoading(false);
      dispatch(toggleAuthModal(false));
      // Handle the response data as needed
    } catch (err) {
      showToastError('Error updating user info');
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleNameUpdate} className="flex flex-col gap-6 text-sm ">
      <label className="flex flex-col gap-1">
        <p className="pl-2">First Name*</p>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </label>
      <label className="flex flex-col gap-1">
        <p className="pl-2">Last Name*</p>

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </label>
      {error && error.length > 0 && <p className="text-red-500">{error}</p>}

      <button
        type={'submit'}
        disabled={firstName.length === 0}
        className="w-full p-3 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isLoading ? 'Updating info...' : 'Update info'}
      </button>
    </form>
  );
};

export default Name;
