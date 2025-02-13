import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/statusDesinfectionService";

// Obtener usuarios (asyncThunk)
export const fetchstatusDesinfection = createAsyncThunk(
  "statusDesinfection/fetchStatusDesinfection",
  async () => {
    return await getService();
  }
);

const initialState = {
  statusDesinfection: [],
  loading: false,
  error: null,
};

export const statusDesinfectionSlice = createSlice({
  name: "statusDesinfection",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchstatusDesinfection.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchstatusDesinfection.fulfilled, (state, action) => {
      state.statusDesinfection = action.payload;
    });
    builder.addCase(fetchstatusDesinfection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default statusDesinfectionSlice.reducer;
