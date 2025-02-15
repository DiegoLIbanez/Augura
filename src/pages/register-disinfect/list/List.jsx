import React,{ useState } from "react";

//Components
import TableComponent from "../../../components/Table/TableComponent";

//Views
import Create from "../create/Create";
import DetailDesinfection from "../detail/DetailDesinfection";

function List() {

  const [view,setView] = useState({
    list: true,
    create: false,
    update: false,
    detail:false
  });

 return (
    <>
      { view.list === true ? 
          <>
            <div className="flex-grow flex justify-center">
              <TableComponent setView={setView} />
            </div>
          </> :
          view.create === true ? <Create setView={setView} /> :
          view.detail === true ? <DetailDesinfection setView={setView} /> :
        <></> 
        }
    </>
  );
}

export default List;
