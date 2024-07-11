import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import React from 'react';
import NavBar from './components/main_components/navBar';
import HomePage from './pages/HomePage';


function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.info("logout clicked")
  };

  return (
    <>
      <NavBar logoutFunction={handleLogout} />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
