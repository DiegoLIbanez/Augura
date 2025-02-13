import { configureStore } from "@reduxjs/toolkit";

//Slices
import companySlice from "./slice/companySlice";
import registeVehicleSlice from "./slice/registeVehicleSlice";
import typeVehicleSlice from "./slice/typeVehicleSlice";
import statusDesinfectionSlice from "./slice/statusDesinfectionSlice";
import typeBurdenSlice from "./slice/typeBurdenSlice";
import typeCommunalSlice from "./slice/typeCommunalSlice";
import typeInputSlice from "./slice/typeInputSlice";

// import loginSlice from "./slice/loginSlice";

export default configureStore({
  reducer: {
    company: companySlice,
    registerVehicle: registeVehicleSlice,
    typeVehicle: typeVehicleSlice,
    statusDesinfection: statusDesinfectionSlice,
    typeBurden: typeBurdenSlice,
    typeCommunal: typeCommunalSlice,
    typeInput: typeInputSlice,
  },
});
