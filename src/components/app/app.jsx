import { Route, Routes } from 'react-router-dom';
import { routes } from '../../constants/routes';
import CreateEvent from '../../pages/create-event/CreateEvent';
import ErrorPage from '../../pages/error/ErrorPage';
import EventsPage from '../../pages/events/EventsPage';
import MarketPlaceEvent from '../../pages/marketplace-event/MarketPlaceEvent';
import MarketplacePage from '../../pages/marketplace/MarketplacePage';
import SingleEventPage from '../../pages/single-event/SingleEventPage';
import SingleUserEventPage from '../../pages/single-user-event/SingleUserEventPage';
import UserEventsPage from '../../pages/user-events/UserEventsPage';
import UserTicketsPage from '../../pages/user-tickets/UserTicketsPage';
import Validate from '../../pages/validate/Validate';
import Navbar from '../navbar/Navbar';
import PrivateRoute from '../privateRoute/PrivateRoute';
import PublicRoute from '../publicRoute/PublicRoute';
import LoginPage from '../../pages/login/LoginPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path={routes.home}
          element={<PublicRoute component={EventsPage} />}
        />
        <Route
          path={routes.login}
          element={<PublicRoute component={LoginPage} restricted />}
        />
        <Route
          path={routes.singleEvent}
          element={<PublicRoute component={SingleEventPage} />}
        />
        <Route
          path={routes.marketplace}
          element={<PublicRoute component={MarketplacePage} />}
        />
        <Route
          path={routes.marketplaceEvent}
          element={<PublicRoute component={MarketPlaceEvent} />}
        />
        <Route
          path={routes.createEvent}
          element={<PrivateRoute component={CreateEvent} />}
        />
        <Route
          path={routes.userTickets}
          element={<PrivateRoute component={UserTicketsPage} />}
        />
        <Route
          path={routes.userEvents}
          element={<PrivateRoute component={UserEventsPage} />}
        />
        <Route
          path={routes.singleUserEvent}
          element={<PrivateRoute component={SingleUserEventPage} />}
        />
        <Route
          path={routes.ticketValidate}
          element={<PublicRoute component={Validate} />}
        />
        <Route
          path={routes.error}
          element={<PublicRoute component={ErrorPage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
