import { Route, Routes } from 'react-router-dom';
import PublicRoute from '../publicRoute/publicRoute';
import Home from '../../pages/home/Home';
import EventsPage from '../../pages/events/EventsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PublicRoute component={Home} />} />
        <Route
          path="/events"
          element={<PublicRoute component={EventsPage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
