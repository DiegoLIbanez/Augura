//Toolkit
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//Services
import { loginService,getProfileService } from "../services/authService";

// Iniciar sesion
export const getToken = async (body) => {
  try {
    let response = await loginService(body);
    // console.log(response);
    response.data.statusCode = response.status;
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }   
};

export const login = createAsyncThunk("auth/profile", async (body) => {
  try {
    let responseToken = await getToken(body);
    // console.log(responseToken);
    let responseProfile = await getProfileService(responseToken.data.token,body.user);
    // console.log(responseProfile);
    let response = {
      token:responseToken.data.token,
      statusCode:responseProfile.data.statusCode,
      user:responseProfile.data.data[0].user,
      email:responseProfile.data.data[0].email,
      role:responseProfile.data.data[0].role.description,
      status:responseProfile.data.data[0].status.description,
    };
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }   
});

// Leer el token almacenado en localStorage
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser !== "undefined" ? storedUser : null,
  token: storedToken !== "undefined" ? storedToken : null,
  isAuthenticated: storedToken && storedToken !== "undefined", 
  status:""
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    restoreSession: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.status = action.payload.status;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.email = null;
      state.role = null;
      state.status = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {   
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;

        localStorage.setItem("user", action.payload.user);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Exportar las acciones para usarlas en otros archivos
export const { restoreSession, logout } = authSlice.actions;
export default authSlice.reducer;


