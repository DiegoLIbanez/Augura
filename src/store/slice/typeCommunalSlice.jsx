import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../services/typeCommunalService";

// Obtener usuarios (asyncThunk)
export const fetchtypeCommunal = createAsyncThunk(
  "typeCommunal/fettypeCommunal",
  async () => {
    return await getService();
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const typeCommunalSlice = createSlice({
  name: "typeCommunal",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchtypeCommunal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchtypeCommunal.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchtypeCommunal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default typeCommunalSlice.reducer;
