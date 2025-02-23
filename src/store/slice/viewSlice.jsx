import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeVehicleDesinfect: false,
  registerDisinfect: false,
  waterConsumption: false,
  createwaterConsumption: false,
  graph: false,
};

const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    setView: (state, action) => {
        Object.keys(state).forEach((key) => { state[key] = false; // Resetea todas las vistas
        });
        state[action.payload] = true; // Activa solo la vista seleccionada
    },
  },
});

export const { setView } = viewsSlice.actions;
export default viewsSlice.reducer;
