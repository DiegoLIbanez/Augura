import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/typeBurdenService";

// Obtener usuarios (asyncThunk)
export const fetchTypeBurden = createAsyncThunk(
  "typeBurden/fetchTypeBurden",
  async () => {
    return await getService();
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const typeBurdenSlice = createSlice({
  name: "typeBurden",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTypeBurden.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTypeBurden.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchTypeBurden.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default typeBurdenSlice.reducer;
