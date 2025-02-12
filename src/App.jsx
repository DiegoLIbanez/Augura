import React from 'react';

//Uso del useContext , para manejar el estado global de los componentes 
import { ViewsProvider } from './context/ViewsContext'; 

//Rutas
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <ViewsProvider>
        <AppRouter /> 
      </ViewsProvider>
    </>
  );
}

export default App;
