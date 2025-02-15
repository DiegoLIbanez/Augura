import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/companyService";

// Obtener usuarios (asyncThunk)
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
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
  name: "company",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCompany.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default companySlice.reducer;
