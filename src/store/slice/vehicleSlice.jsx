import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/vehicleService.jsx";

// Obtener usuarios (asyncThunk)
export const fetchvehicle = createAsyncThunk(
  "vehicle/fetchvehicle",
  async () => {
    return await getService();
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const companySlice = createSlice({
  name: "vehicle",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchvehicle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchvehicle.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchvehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default companySlice.reducer;
