import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from '../../constants/routes';
import ErrorPage from '../../pages/error/ErrorPage';
import EventPaymentPage from '../../pages/event-payment/EventPaymentPage';
import EventsPage from '../../pages/events/EventsPage';
import LoginPage from '../../pages/login/LoginPage';
import MarketPlaceEvent from '../../pages/marketplace-event/MarketPlaceEvent';
import MarketplacePage from '../../pages/marketplace/MarketplacePage';
import SingleEventPage from '../../pages/single-event/SingleEventPage';
import SingleUserEventPage from '../../pages/single-user-event/SingleUserEventPage';
import UserEventsPage from '../../pages/user-events/UserEventsPage';
import UserProfile from '../../pages/user-profile/UserProfile';
import UserTicketsPage from '../../pages/user-tickets/UserTicketsPage';
import Validate from '../../pages/validate/Validate';
import Navbar from '../navbar/Navbar';
import PrivateRoute from '../privateRoute/PrivateRoute';
import PublicRoute from '../publicRoute/PublicRoute';
import Success from '../../pages/success/Success';

function App() {
  return (
    <div className="relative min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
      />
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
          path={routes.eventPayment}
          element={<PrivateRoute component={EventPaymentPage} />}
        />
        <Route
          path={routes.userProfile}
          element={<PrivateRoute component={UserProfile} />}
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
          path={routes.paymentSuccess}
          element={<PrivateRoute component={Success} />}
        />
        <Route
          path={routes.ticketValidate}
          element={<PrivateRoute component={Validate} />}
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
