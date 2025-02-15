import React, { useState } from "react";

//Components
import TableComponent from "../../../components/Table/TableComponent";
//Slice

//Redux

function List() {
  return (
    <>
      <div className="flex-grow flex justify-center">
        <TableComponent />
      </div>
    </>
  );
}

export default List;
