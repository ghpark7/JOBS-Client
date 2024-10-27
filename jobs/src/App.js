import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/mainPage/Main';
import Input from './components/inputPage/Input';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/input" element={<Input />} />
      </Routes>
    </Router>
  );
};

export default App;