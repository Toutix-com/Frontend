import React from 'react';
import SingleUserEvent from '../../components/user/SingleUserEvent';

const UserEventsPage = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      {' '}
      <div className="px-4 py-20 sm:px-10 md:px-24">
        <div className="flex flex-col gap-10 mx-auto max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-normal">
              Your Events
            </h1>
            <p className="text-gray-500">Manage your events here.</p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <SingleUserEvent />
            <SingleUserEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
