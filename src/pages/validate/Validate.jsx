import React, { useState } from 'react';
import { publicAxiosInstance } from '../../utils/axiosConfig';
import { useParams } from 'react-router';
import SingleTicket from '../../components/tickets/SingleTicket';

const Validate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { ticketID } = useParams();

  const handleValidateTicket = async () => {
    setIsLoading(true);
    try {
      // Make API call to validate ticket
      const response = await publicAxiosInstance.post(
        `/tickets/${ticketID}/validate`
      );
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage('An error occurred while validating the ticket.');
    }
    setIsLoading(false);
  };

  return (
    <div className="grid w-screen h-screen p-4 py-10 bg-gray-200 place-items-center sm:p-10 md:p-16 lg:p-20">
      <div className="flex flex-col items-center w-full max-w-xl gap-4 p-6">
        <SingleTicket />

        <button
          onClick={handleValidateTicket}
          disabled={isLoading}
          className="p-3 px-6 mx-auto font-semibold text-white bg-blue-500 rounded-md"
        >
          {isLoading ? 'Validating...' : 'Validate Ticket'}
        </button>
        {isSuccess && <p>Ticket validated successfully!</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Validate;
