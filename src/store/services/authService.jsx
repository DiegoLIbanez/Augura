import axios from "axios";

//Config routes
import { API_ROUTES } from '../../api/apiConfig';

export const loginService = async (body) => {

  const api = axios.create({
    baseURL: API_ROUTES.LOGIN,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await api.post("/", body);  
  // console.log(response);  
  return response;
};

export const getProfileService = async (token,userName) => {
  // console.log(token);  
  const api = axios.create({
    baseURL: API_ROUTES.AUTH,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const response = await api.get("/" + userName);  
  // console.log(response);  
  return response;
};