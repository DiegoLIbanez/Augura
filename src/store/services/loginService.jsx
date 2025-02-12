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

//Cerrar sesion
export const logoutService = async (body) => {
  // const response = await api.post("/", body);
  // return response.data;
};

// export const getAllCompany = createAsyncThunk(GET_COMPANY_ALL, async () => {
//   const res = await axios.get(API_ROUTES.COMPANY);
//   return res.data;
// });