import React from 'react';
import { Route, Routes } from 'react-router-dom';

//Vistas
import Index from '../pages/index/Index';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import NotFound from '../pages/notFound/NotFound'; 

//Components
// import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

// useContext for material ui
// import { ThemeContextProvider } from '../context/ThemeContext';

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/index' element={<Index />} />
        <Route path='/login' element={<Login />} />        
        <Route path='/home' element={<Home />} />   
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRouter