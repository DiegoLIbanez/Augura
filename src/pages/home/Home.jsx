import React, { useContext } from "react";

//Views
import ListDisinfect from "../register-disinfect/list/List";
import RegisterDisinfect from "../register-disinfect/create/Create";

//Components
import Navbar from "../../components/Navbar/Navbar";

//Context for views
import { ViewsContext } from "../../context/ViewsContext";

function Home() {
  //Manejo de las vistas
  const { views } = useContext(ViewsContext);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="mt-20 sm:px-6 lg:px-8 py-20">
          { 
            views.listDisinfect === true ? <ListDisinfect /> :
            views.registerDisinfect === true ? <RegisterDisinfect /> :
            <></> 
          }
        </div>
      </div>
    </>
  );
}

export default Home;
