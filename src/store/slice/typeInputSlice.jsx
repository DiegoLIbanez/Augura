import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/typeInputService";

// Obtener usuarios (asyncThunk)
export const fetchtypeInput = createAsyncThunk(
  "typeInput/fettypeInput",
  async () => {
    return await getService();
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const typeInputSlice = createSlice({
  name: "typeInput",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchtypeInput.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchtypeInput.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchtypeInput.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default typeInputSlice.reducer;
