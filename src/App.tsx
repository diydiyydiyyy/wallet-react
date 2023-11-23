import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import CheckContract from './screens/CheckContract';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contract" element={<CheckContract />} />
      </Routes>
    </Router>
  );
}

export default App;
