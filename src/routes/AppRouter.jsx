import React from "react";
import { Route, Routes } from "react-router-dom";

//Vistas
import Index from "../pages/index/Index";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";

//Components
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<Index />} />

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
    </>
  );
}

export default AppRouter;
