import React,{ useEffect,useState } from "react";

//Pages
import ListDisinfect from "../registerDesinfect/list/List";
import RegisterDisinfect from "../registerDesinfect/create/Create";
import RegisterWaterConsumption from "../waterConsumption/create/Create";
import ListWaterConsumption from "../waterConsumption/list/List";
import GraphList from "../graph/Graph";

//Redux
import { useSelector } from "react-redux";

//Components
import Navbar from "../../components/Navbar/Navbar";

function Home() {

  const views = useSelector((state) => state.views);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log("El estado de views cambió:", views);
    setCount(prev => prev + 1);
  }, [views]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div key={count} className="mt-20 sm:px-6 lg:px-8 py-3">
          {views.listDisinfect && <ListDisinfect />}
          {views.registerDisinfect && <RegisterDisinfect />}
          {views.waterConsumption && <ListWaterConsumption />}
          {views.createwaterConsumption && <RegisterWaterConsumption />}
          {views.graph && <GraphList />}
        </div>
      </div>
    </>
  );
}

export default Home;
