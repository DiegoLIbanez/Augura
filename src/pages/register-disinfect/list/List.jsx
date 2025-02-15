import React,{ useState } from "react";

//Components
import TableComponent from "../../../components/Table/TableComponent";

//Views
import Create from "../create/Create";

function List() {

  const [ view, setView ] = useState({
    list: true,
    create: false,
    update: false
  });

 return (
    <>
      { view.list === true && (
        <>
          <div className="flex-grow flex justify-center">
            <TableComponent />
          </div>
        </>
      )}
      { view.create === true && <Create setView={ setView } /> }
      { view.update === true && <></> }
    </>
  );
}

export default List;
