import React,{ useState,createContext } from 'react'

export const ViewsContext = createContext();

export function ViewsProvider({ children }) {

  const [views, setViews] = useState({
    homeVehicleDesinfect: false, 
    registerDisinfect: false,
    waterConsumption: false,
    CreatewaterConsumption: false,
    graph: false,
  });

  return (
    <>
      <ViewsContext.Provider value={{ views, setViews }}>
        {children}
      </ViewsContext.Provider>
    </>
  )
}



// import React, { useState, createContext } from "react";

// export const ViewsContext = createContext();

// export function ViewsProvider({ children }) {

//   const [views, setViews] = useState({
//     homeVehicleDesinfect: true, 
//     registerDisinfect: false,
//     waterConsumption: false,
//     CreatewaterConsumption: false,
//     graph: false,
//   });

//   return (
//     <ViewsContext.Provider value={{ views, setViews }}>
//       {children}
//     </ViewsContext.Provider>
//   );
// }
