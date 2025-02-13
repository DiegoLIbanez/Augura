import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/registeVehicleService";
import { current } from "immer"; // Importa current de immer

// Obtener usuarios (asyncThunk)
export const fetchregisterVehicleSlice = createAsyncThunk(
  "registerVehicle/fetregisterVehicle",
  async () => {
    return await getService();
  }
);

const initialState = {
  registerVehicle: [], // Cambiado a un array vacío
  filteredData: [], // Datos filtrados
  loading: false,
  error: null,
};

export const registerVehicleSlice = createSlice({
  name: "registerVehicle",
  initialState: initialState,
  reducers: {
    //buscar el tipo de vehiculo
    filterTypeVehicle: (state, action) => {
      console.log(state.registerVehicle);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchregisterVehicleSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchregisterVehicleSlice.fulfilled, (state, action) => {
      state.registerVehicle = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchregisterVehicleSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { filterTypeVehicle } = registerVehicleSlice.actions;

export default registerVehicleSlice.reducer;
