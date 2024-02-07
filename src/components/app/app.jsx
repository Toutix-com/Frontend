import { Route, Routes } from 'react-router-dom';
import EventsPage from '../../pages/events/EventsPage';
import PublicRoute from '../publicRoute/publicRoute';
import Navbar from '../navbar/Navbar';
import SingleEventPage from '../../pages/single-event/SingleEventPage';
import MarketplacePage from '../../pages/marketplace/MarketplacePage';
import { routes } from '../../constants/routes';

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
      </Routes>
    </div>
  );
}

export default App;
