import axios from "axios";

//Config routes
import { API_ROUTES } from '../../api/apiConfig';

const api = axios.create({
  baseURL: API_ROUTES.LOGIN,
  headers: {
    "Content-Type": "application/json",
  },
});

// Iniciar sesion
export const loginService = async (body) => {
  const response = await api.post("/", body);  
  return response.data;
};