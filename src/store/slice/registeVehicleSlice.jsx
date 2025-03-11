import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getService,
  getServiceById,
  createService,
  deleteUser,
} from "../services/registeVehicleService";

// Obtener usuarios (asyncThunk)
export const fetchregisterVehicleSlice = createAsyncThunk(
  "registerVehicle/fetregisterVehicle",
  async () => {
    return await getService();
  }
);

// Obtener el registerVehicle por id
export const fetchregisterVehicleByIdSlice = createAsyncThunk(
  "registerVehicle/fetregisterVehicleById",
  async (id) => {
    return await getServiceById(id);
  }
);

// Crear registerVehicle
export const createRegisterVehicleSlice = async (body) => {
  return await createService(body);
};

// Eliminar registerVehicle
export const deleteRegisterVehicleSlice = createAsyncThunk(
  "registerVehicle/deleteRegisterVehicle",
  async (vehicleId, { rejectWithValue }) => {
    try {
      await deleteUser(vehicleId); // Elimina el registro en el backend
      return vehicleId; // Devuelve el ID eliminado
    } catch (error) {
      return rejectWithValue(error.response.data); // Maneja errores
    }
  }
);

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
    // Agregar registro por id
    addRegisterVehicleId: (state, action) => {
      state.registerVehicleObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Obtener todos los registros
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

    // Obtener por id
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

    // Eliminar registro
    builder.addCase(deleteRegisterVehicleSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRegisterVehicleSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (vehicle) => vehicle.id !== action.payload
      );
      state.statusCode = 200;
    });
    builder.addCase(deleteRegisterVehicleSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { addRegisterVehicleId } = registerVehicleSlice.actions;

export default registerVehicleSlice.reducer;
