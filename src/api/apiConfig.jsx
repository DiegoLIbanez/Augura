const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/v1/login`,
  COMPANY: `${API_BASE_URL}/v1/company`,
  POSTS: `${API_BASE_URL}/posts`,
  COMMENTS: `${API_BASE_URL}/comments`,
  REGISTER_VEHICLE: `${API_BASE_URL}/v1/register-vehicle/`,
  TYPE_VEHICLE: `${API_BASE_URL}/v1/type-vehicle/`,
  STATUS_DESINFECTION: `${API_BASE_URL}/v1/status-desinfection/`,
  TYPE_BURDEN: `${API_BASE_URL}/v1/type-burden/`,
  TYPE_COMMUNAL: `${API_BASE_URL}/v1/type-communal/`,
  TYPE_INPUT: `${API_BASE_URL}/v1/type-input/`,
  WATER_CONSUMPTION: `${API_BASE_URL}/v1/consumption/`,
};
