import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import React from 'react';
import NavBar from './components/main_components/navBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import SigninPage from './pages/Auth/SigninPage';

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
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signin' element={<SigninPage />}/>
      </Routes>
    </>
  );
}

export default App;
