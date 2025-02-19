import React, { useContext } from "react";

//Pages
import ListDisinfect from "../registerDesinfect/list/List";
import RegisterDisinfect from "../registerDesinfect/create/Create";
import ListWaterConsumption from "../waterConsumption/list/List";
import GraphList from "../graph/Graph";

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
        <div className="mt-20 sm:px-6 lg:px-8 py-3">
          {views.listDisinfect === true ? (
            <ListDisinfect />
          ) : views.registerDisinfect === true ? (
            <RegisterDisinfect />
          ) : views.waterConsumption === true ? (
            <ListWaterConsumption />
          ) : views.graph === true ? (
            <GraphList />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
