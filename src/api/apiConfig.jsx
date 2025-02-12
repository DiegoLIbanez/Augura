const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/v1/company/login`,
  COMPANY: `${API_BASE_URL}/v1/company`,
  POSTS: `${API_BASE_URL}/posts`,
  COMMENTS: `${API_BASE_URL}/comments`,
};
