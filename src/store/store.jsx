import { configureStore } from "@reduxjs/toolkit";

//Slices
import companySlice from "./slice/companySlice";
import vehicleSlice from "./slice/vehicleSlice";
import registeVehicleSlice from "./slice/registeVehicleSlice";
import typeVehicleSlice from "./slice/typeVehicleSlice";
import statusDesinfectionSlice from "./slice/statusDesinfectionSlice";
import typeBurdenSlice from "./slice/typeBurdenSlice";
import typeCommunalSlice from "./slice/typeCommunalSlice";
import typeInputSlice from "./slice/typeInputSlice";
import authSlice from "./slice/authSlice";
import waterConsumptionSlice from "./slice/waterConsumtionSlice";
import userSlice from "./slice/userSlice";

// import loginSlice from "./slice/loginSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    vehicle: vehicleSlice,
    user: userSlice,
    company: companySlice,
    registerVehicle: registeVehicleSlice,
    typeVehicle: typeVehicleSlice,
    statusDesinfection: statusDesinfectionSlice,
    typeBurden: typeBurdenSlice,
    typeCommunal: typeCommunalSlice,
    typeInput: typeInputSlice,
    waterConsumption: waterConsumptionSlice,
  },
});
