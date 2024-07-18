import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavBar from './components/main_components/navBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import SigninPage from './pages/Auth/SigninPage';
import UserModel from 'objects/UserModel';
import axios from "axios";
import { LOCAL_HOST_API_URL } from 'utilities/AppConstants';
import { getCurrentUser } from 'utilities/AuthHelpers';
import SchedulerPage from 'pages/SchedulerPage';
import ProtectedRoutes from 'utilities/ProtectedRoutes';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleLogin = (appUser: string) => {
    const userData: UserModel = JSON.parse(appUser);
    sessionStorage.setItem("user", appUser);
    setUser(userData);
  }

  const handleLogout = async () => {
    sessionStorage.removeItem('user')
    // try {
    //     await axios.get(`${LOCAL_HOST_API_URL}/logout`);
    // } catch (error) {
    //     console.error(error)
    // }
    navigate("/");
    setUser({});
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [])

  return (
    <>
      <NavBar logoutFunction={handleLogout} />
      <Routes>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/scheduler' element={<SchedulerPage/>}/>
        </Route>

        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage setUserFunction={handleLogin}/>}/>
        <Route path='/signin' element={<SigninPage setUserFunction={handleLogin}/>}/>
      </Routes>
    </>
  );
}

export default App;
