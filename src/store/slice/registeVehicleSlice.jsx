import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getService,
  getServiceById,
  createService,
} from "../services/registeVehicleService";

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

export const createRegisterVehicleSlice = async (body) => {
  return await createService(body);
};

const initialState = {
  statusCode: 0,
  data: [],
  registerVehicleObj: {},
  loading: false,
  error: null,
};

export const registerVehicleSlice = createSlice({
  name: "registerVehicle",
  initialState: initialState,
  reducers: {
    // agregar registro pi id
    addRegisterVehicleId: (state, action) => {
      state.registerVehicleObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchregisterVehicleSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchregisterVehicleSlice.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.statusCode = action.payload.statusCode;
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

export const { addRegisterVehicleId } = registerVehicleSlice.actions;

export default registerVehicleSlice.reducer;
