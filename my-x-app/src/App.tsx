// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
