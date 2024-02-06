import React from 'react';
import SingleEventDetails from '../../components/single-event/SingleEventDetails';
import TicketSelect from '../../components/single-event/TicketSelect';

const SingleEventPage = () => {
  return (
    <div className="grid grid-cols-1 gap-16 p-4 bg-gray-200 xl:grid-cols-2 sm:p-10 md:p-20">
      <SingleEventDetails />
      <TicketSelect />
    </div>
  );
};

export default SingleEventPage;
