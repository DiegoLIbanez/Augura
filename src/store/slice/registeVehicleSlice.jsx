import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService, getServiceById } from "../services/registeVehicleService";
import { current } from "immer"; // Importa current de immer

// Obtener usuarios (asyncThunk)
export const fetchregisterVehicleSlice = createAsyncThunk(
  "registerVehicle/fetregisterVehicle",
  async () => {
    return await getService();
  }
);

// obtener el registerVehicle por id

export const fetchregisterVehicleByIdSlice = createAsyncThunk(
  "registerVehicle/fetregisterVehicleById",
  async (id) => {
    return await getServiceById(id);
  }
);

const initialState = {
  data: [], // Cambiado a un array vacío
  registerVehicleId: {}, // Cambiado a un array vacío
  loading: false,
  error: null,
};

export const registerVehicleSlice = createSlice({
  name: "registerVehicle",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchregisterVehicleSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchregisterVehicleSlice.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchregisterVehicleSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // obtener por id
    builder.addCase(fetchregisterVehicleByIdSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchregisterVehicleByIdSlice.fulfilled,
      (state, action) => {
        state.registerVehicleId = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchregisterVehicleByIdSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default registerVehicleSlice.reducer;
