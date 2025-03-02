import React from "react";
import { Route, Router, Routes } from "react-router-dom";

//Vistas
import Index from "../pages/index/Index";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";

//Components
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

//Auth
import AuthProvider from "../components/AuthProvider/AuthProvider";

function AppRouter() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default AppRouter;
