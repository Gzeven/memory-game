import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import GamePage from './components/GamePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GamePage />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
};

export default App;
