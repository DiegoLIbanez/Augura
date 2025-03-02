const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  AUTH: `${API_BASE_URL}/v1/auth/profile`,
  LOGIN: `${API_BASE_URL}/v1/login/`,
  USER: `${API_BASE_URL}/v1/person/`,
  COMPANY: `${API_BASE_URL}/v1/company/`,
  VEHICLE: `${API_BASE_URL}/v1/vehicle/`,
  REGISTER_VEHICLE: `${API_BASE_URL}/v1/register-vehicle/`,
  TYPE_VEHICLE: `${API_BASE_URL}/v1/type-vehicle/`,
  STATUS_DESINFECTION: `${API_BASE_URL}/v1/status-desinfection/`,
  TYPE_BURDEN: `${API_BASE_URL}/v1/type-burden/`,
  TYPE_COMMUNAL: `${API_BASE_URL}/v1/type-communal/`,
  TYPE_INPUT: `${API_BASE_URL}/v1/type-input/`,
  WATER_CONSUMPTION: `${API_BASE_URL}/v1/consumption/`,
};
