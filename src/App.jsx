import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCompany } from "./store/action/companyAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
