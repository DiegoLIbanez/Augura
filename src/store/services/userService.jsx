import axios from "axios";

//Config routes
import { API_ROUTES } from "../../api/apiConfig";

const api = axios.create({
  baseURL: API_ROUTES.USER,
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener todos los usuarios
export const getAllService = async () => {
  const response = await api.get("/");
  return response.data;
};

// Obtener solo los usuarios conductores
export const getAllDriverService = async (id) => {
  const response = await api.get("/driver/"+id);
  return response.data;
};

// Crear
// export const createUser = async (userData) => {
//   const response = await api.post("/", userData);
//   return response.data;
// };

// Actualizar
// export const updateUser = async (id, userData) => {
//   const response = await api.put(`/${id}`, userData);
//   return response.data;
// };

// Eliminar
// export const deleteUser = async (id) => {
//   await api.delete(`/${id}`);
// };

// export const getAllCompany = createAsyncThunk(GET_COMPANY_ALL, async () => {
//   const res = await axios.get(API_ROUTES.COMPANY);
//   return res.data;
// });
