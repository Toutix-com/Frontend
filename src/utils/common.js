import { differenceInHours } from 'date-fns';
import { ticketStatus } from '../constants/ticket';

export const isEventActive = (date) => {
  const difference = differenceInHours(new Date(), new Date(date));
  return difference <= 6;
};

export const getTotalPrice = (ticketPrice) => {
  if (isNaN(parseFloat(ticketPrice))) return 0;
  const price = parseFloat(ticketPrice);
  return parseFloat(price + 0.1 * price).toFixed(2);
};

export const getTicketPrice = (ticket) => {
  if (ticket.Status === ticketStatus.Available) {
    return getTotalPrice(ticket.InitialPrice);
  }
  if (ticket.Status === ticketStatus.ListedonMarketplace) {
    return getTotalPrice(ticket.Price);
  }
};
