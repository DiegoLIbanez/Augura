//Uso del useContext , para manejar el estado global de los componentes 
import { ViewsProvider } from './context/ViewsContext'; 

//Rutas
import AppRouter from './routes/AppRouter';


function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCompany());
  // }, [dispatch]);

  return (
    <>
    <ViewsProvider>
      <AppRouter /> 
    </ViewsProvider>
    </>
  );
}

export default App;
