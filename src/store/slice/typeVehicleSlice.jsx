import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/typeVehicleService";

// Obtener usuarios (asyncThunk)
export const fetchtypeVehicle = createAsyncThunk(
  "typeVehicle/fettypeVehicle",
  async () => {
    return await getService();
  }
);

const initialState = {
  typeVehicle: [],
  loading: false,
  error: null,
};

export const typeVehicleSlice = createSlice({
  name: "typeVehicle",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchtypeVehicle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchtypeVehicle.fulfilled, (state, action) => {
      state.typeVehicle = action.payload;
    });
    builder.addCase(fetchtypeVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default typeVehicleSlice.reducer;
