import './App.css';

import Driver from './components/Driver.js';
import Data from './components/Data.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Driver />} />
        <Route exact path='/data' element={<Data />} />
      </Routes>
    </Router>
  );
}

export default App;
