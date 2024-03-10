import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SingleTicket from '../../components/tickets/SingleTicket';
import { privateAxiosInstance } from '../../utils/axiosConfig';
import { showToastError } from '../../utils/toast';

const Validate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTicketLoading, setIsTicketLoading] = useState(true);
  const [ticket, setTicket] = useState({});
  const [bgColor, setBgColor] = useState('bg-blue-500');

  const { ticketID } = useParams();

  const fetchSingleTicket = async () => {
    // Make API call to fetch single ticket
    setIsTicketLoading(true);
    try {
      // Make API call to validate ticket
      const { data } = await privateAxiosInstance.get(`/ticket/${ticketID}`);
      console.log(data);
      if (data) {
        setTicket(data);
      } else {
        showToastError('An error occurred while fetching the ticket.');
      }
    } catch (error) {
      console.log(error.message);
      if (
        error?.response &&
        error?.response?.status === 404 &&
        error?.response?.data?.error
      ) {
        showToastError(error.response.data.error);
      }
    }
    setIsTicketLoading(false);
  };

  const handleValidateTicket = async () => {
    setIsLoading(true);
    try {
      // Make API call to validate ticket
      const { data } = await privateAxiosInstance.post(
        `/ticket/${ticketID}/validate`
      );
      if (data) {
        if (data.valid) {
          setIsSuccess(data.valid);
          setBgColor('bg-green-500');
        } else {
          setErrorMessage('Ticket is not valid');
          setBgColor('bg-red-500');
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while validating the ticket.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSingleTicket();
  }, []);

  return (
    <div className="grid w-screen h-screen p-4 py-10 bg-gray-200 place-items-center sm:p-10 md:p-16 lg:p-20">
      {isTicketLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center w-full max-w-xl gap-4 p-6">
          <SingleTicket ticket={ticket} isValidating />

          <button
            onClick={handleValidateTicket}
            disabled={isLoading}
            className={`p-3 px-6 mx-auto font-semibold text-white ${bgColor} rounded-md`}
          >
            {isLoading ? 'Validating...' : 'Validate Ticket'}
          </button>
          {isSuccess && <p>Ticket validated successfully!</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Validate;
