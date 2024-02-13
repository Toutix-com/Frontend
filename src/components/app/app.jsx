import { Route, Routes } from 'react-router-dom';
import EventsPage from '../../pages/events/EventsPage';
import PublicRoute from '../publicRoute/publicRoute';
import Navbar from '../navbar/Navbar';
import SingleEventPage from '../../pages/single-event/SingleEventPage';
import MarketplacePage from '../../pages/marketplace/MarketplacePage';
import { routes } from '../../constants/routes';
import ErrorPage from '../../pages/error/ErrorPage';
import MarketPlaceEvent from '../../pages/marketplace-event/MarketPlaceEvent';
import CreateEvent from '../../pages/create-event/CreateEvent';

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
          element={<PublicRoute component={CreateEvent} />}
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
