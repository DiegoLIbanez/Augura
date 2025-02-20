import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  getAllService,getAllDriverService } from "../services/userService";

  //Obtener los usuarios
  export const fetchUser = createAsyncThunk("user/fetchUser",async () => {  
      return await getAllService();
    }
  );

  // Obtener solo los usuarios tipo conductor
  export const fetchUserDriver = createAsyncThunk("user/fetchUserDriver",async (id) => {
    return await getAllDriverService(id);
  }
  );

const initialState = {
  dataUser: [],
  dataUserDriver: [],
  loading: false,
  error: null,
};

export const companySlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.dataUser = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });    

    builder.addCase(fetchUserDriver.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDriver.fulfilled, (state, action) => {
      state.dataUserDriver = action.payload;
    });
    builder.addCase(fetchUserDriver.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

  },
});

export default companySlice.reducer;
