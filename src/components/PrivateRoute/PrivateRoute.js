import React from 'react';

//Navegacion
import { Navigate } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.login);
    return isAuthenticated.statusCode === 200 ? children : <Navigate to="/login" />
}

export default PrivateRoute;