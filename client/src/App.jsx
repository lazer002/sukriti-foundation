import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import { AuthContext } from './AuthContext';


function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <Signin />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;
