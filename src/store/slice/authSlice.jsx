
//Toolkit
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//Services
import { loginService } from "../services/authService";

// Iniciar sesion
export const login = createAsyncThunk("auth/login", async (body) => {
  try {
    let response = await loginService(body);
    // if (response.data) {
    //   sessionStorage.setItem("token", response.data.token);
    // };    
    response.data.statusCode = response.statusCode;
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      statusMessage:'algo salio mal',
      data:error
    };
  }   
});

// Cerrar sesion
export const logout = () => {
  // authSlice.actions.
};

const initialState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated:false,
  // token: sessionStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.status = "loading";
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      // state.token = action.payload.token;      
    })
    .addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
  },
});

export default authSlice.reducer;