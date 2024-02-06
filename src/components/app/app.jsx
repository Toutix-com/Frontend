import { Route, Routes } from 'react-router-dom';
import EventsPage from '../../pages/events/EventsPage';
import PublicRoute from '../publicRoute/publicRoute';
import Navbar from '../navbar/Navbar';
import SingleEventPage from '../../pages/single-event/SingleEventPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute component={EventsPage} />} />
        <Route
          path="/events/:eventID"
          element={<PublicRoute component={SingleEventPage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
