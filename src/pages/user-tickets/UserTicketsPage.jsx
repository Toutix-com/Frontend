import React, { useEffect, useState } from 'react';
import SingleTicket from '../../components/tickets/SingleTicket';
import { privateAxiosInstance } from '../../utils/axiosConfig';

const UserTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const { data } = await privateAxiosInstance.get('/user/me/tickets');
      console.log(data);
      setTickets(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="px-4 py-20 sm:px-10 md:px-24">
        <div className="flex flex-col gap-10 mx-auto max-w-7xl">
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-normal">My Tickets</h1>
            <p className="text-gray-500">Check all your tickets here.</p>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <SingleTicket
                  key={ticket.TicketID}
                  ticket={ticket}
                  refetch={fetchTickets}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTicketsPage;
