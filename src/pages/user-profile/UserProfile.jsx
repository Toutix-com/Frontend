import React, { useEffect, useState } from 'react';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { showToastSuccess } from '../../utils/toast';
import { format, isValid } from 'date-fns';
import { activeCurrency } from '../../constants/currency';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const getUserProfile = async () => {
    try {
      const { data } = await privateAxiosInstance.get('/user/me');
      if (data) {
        setFirstName(data?.FirstName || '');
        setLastName(data?.LastName || '');
        setDob(data?.Birthday || '');
        setAddress(data?.Address || '');
        setUser(data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleUserProfileChange = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await privateAxiosInstance.put('/user/me/update', {
        FirstName: firstName,
        LastName: lastName,
        Address: address,
        PhoneNumber: phoneNumber,
        Birthday: dob
      });
      setIsUpdating(false);
      showToastSuccess(data.message);
      getUserProfile();
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-200 sm:p-10 md:p-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col w-full max-w-md gap-4 p-8 bg-white rounded-lg shadow-md ">
          <h1 className="flex items-center justify-between text-xl font-semibold">
            <span className="text-gray-500">Credits:</span> {activeCurrency}
            {user?.Credit ?? 0}
          </h1>
          <form
            onSubmit={handleUserProfileChange}
            className="space-y-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Email:</label>
              <p className="text-sm">{user?.Email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-700">First Name:</label>
              {isEditing ? (
                <input
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-transparent focus:border-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              ) : (
                <p>{firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-700">Last Name:</label>
              {isEditing ? (
                <input
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-transparent focus:border-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              ) : (
                <p>{lastName}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-700">Phone Number:</label>
              {isEditing ? (
                <input
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-transparent focus:border-blue-500"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                />
              ) : (
                <p>{phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-700">Date of Birth:</label>
              {isEditing ? (
                <input
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-transparent focus:border-blue-500"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="Date of Birth"
                />
              ) : (
                <p>
                  {dob &&
                    isValid(new Date(dob)) &&
                    format(new Date(dob), 'do MMM yyyy')}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-700">Address:</label>
              {isEditing ? (
                <textarea
                  className="w-full h-20 p-2 mt-2 text-sm border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-transparent focus:border-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              ) : (
                <p>{address}</p>
              )}
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            )}
          </form>
          {!isEditing && (
            <button
              type="button"
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
