import React from 'react';
import SingleUserEvent from '../../components/user/SingleUserEvent';

const UserEventsPage = () => {
  return (
    <div className="w-screen">
      {' '}
      <div className="px-4 py-20 bg-gray-300 sm:px-10 md:px-24">
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
            <SingleUserEvent />
            <SingleUserEvent />
            <SingleUserEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
