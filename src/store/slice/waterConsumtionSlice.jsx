import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, getService } from "../services/waterConsumptionService";

// Obtener usuarios (asyncThunk)
export const fetchWaterConsumption = createAsyncThunk(
  "waterConsumption/fetchWaterConsumption",
  async () => {
    return await getService();
  }
);

// Crear usuario (asyncThunk)
export const createWaterConsumption = async (userData) => {
  return await createUser(userData);
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const waterConsumptionSlice = createSlice({
  name: "waterConsumption",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // obtener registros
    builder.addCase(fetchWaterConsumption.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWaterConsumption.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchWaterConsumption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default waterConsumptionSlice.reducer;
