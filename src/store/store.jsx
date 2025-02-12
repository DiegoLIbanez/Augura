import { configureStore } from "@reduxjs/toolkit";

//Slices
import companySlice from "./slice/companySlice";
// import loginSlice from "./slice/loginSlice";

export default configureStore({
  reducer: {
    company: companySlice,
  },
});
