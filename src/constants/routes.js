export const routes = {
  home: '/',
  login: '/login',
  singleEvent: '/events/:eventID',
  marketplace: '/marketplace',
  marketplaceEvent: '/marketplace/events/:eventID',
  createEvent: '/events/create',
  userTickets: '/users/:userID/tickets',
  userEvents: '/users/:userID/events',
  singleUserEvent: '/users/:userID/events/:eventID',
  ticketValidate: '/tickets/:ticketID/validate',
  error: '*'
};
