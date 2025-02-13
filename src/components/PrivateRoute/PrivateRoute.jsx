import React from 'react';

//Navegacion
import { Navigate } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";

//Validate token
import { jwtDecode } from "jwt-decode";

export const checkTokenExpiration = (token) => {
  if (!token) return true; // Si no hay token, se considera expirado

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convertir a segundos

    console.log(currentTime);
    

    return decoded.exp < currentTime; // Retorna true si el token ha expirado
  } catch (error) {
    return true; // Si falla, consideramos que el token es inválido
  }
};

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated === true ? children : <Navigate to="/login" />
}

export default PrivateRoute;