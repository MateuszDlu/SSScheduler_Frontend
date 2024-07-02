//import logo from './images/SSSLogo_vector.svg';
import './App.css';
import {Route, Routes, useNavigate,} from "react-router-dom";
import React from 'react';
import NavBar from './components/main_components/navBar'
import HomePage from './pages/HomePage'

function App() {
  //user
  const navigate = useNavigate()
  //handle login

  const handleLogout = async () => {
    //handle logout
  }

  return (
    <>
      <NavBar logoutFunction={handleLogout}/>
      <Routes>
        
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </>
  );
}

export default App;
