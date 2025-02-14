import React, { useContext } from "react";

//Views
import ListDisinfect from "../register-disinfect/list/List";

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
        <div className="container sm:px-6 lg:px-8 py-20">
          { views.listDisinfect === true ? <ListDisinfect /> : <></> }
        </div>
      </div>
    </>
  );
}

export default Home;
