import { configureStore } from "@reduxjs/toolkit";

import companyReducer from "./reducers/companyReducer";

export default configureStore({
  reducer: {
    company: companyReducer,
  },
});
