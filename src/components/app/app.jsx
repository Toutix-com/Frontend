import { Route, Routes } from 'react-router-dom';
import EventsPage from '../../pages/events/EventsPage';
import PublicRoute from '../publicRoute/publicRoute';
import Navbar from '../navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute component={EventsPage} />} />
      </Routes>
    </div>
  );
}

export default App;
