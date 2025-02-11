import { createSlice } from "@reduxjs/toolkit";
import { getAllCompany } from "../action/companyAction";

const initialState = {
  company: [],
  loading: false,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {
    setCompany: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCompany.fulfilled, (state, action) => {
      state.company = action.payload;
    });
    builder.addCase(getAllCompany.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
