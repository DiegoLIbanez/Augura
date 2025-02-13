import React, { useEffect } from "react";

//Components
import TableComponent from "../../../components/Table/TableComponent";

//Slice
import { fetchCompany } from "../../../store/slice/companySlice";

//Redux
import { useDispatch } from "react-redux";

function List() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompany());
  }, []);

  return (
    <>
      <div className="flex-grow flex justify-center">
        <TableComponent />
      </div>
    </>
  );
}

export default List;
