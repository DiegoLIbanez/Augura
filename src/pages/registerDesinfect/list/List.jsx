import React, { useEffect, useState } from "react";

//Components
import TableComponent from "../../../components/Table/TableComponent";

//Views
import Create from "../create/Create";
import DetailDesinfection from "../detail/DetailDesinfection";
import { useDispatch, useSelector } from "react-redux";
import { fetchtypeVehicle } from "../../../store/slice/typeVehicleSlice";
import { fetchCompany } from "../../../store/slice/companySlice";
import { fetchregisterVehicleSlice } from "../../../store/slice/registeVehicleSlice";
import { fetchstatusDesinfection } from "../../../store/slice/statusDesinfectionSlice";
import { fetchTypeBurden } from "../../../store/slice/typeBurdenSlice";
import { fetchtypeCommunal } from "../../../store/slice/typeCommunalSlice";
import { fetchtypeInput } from "../../../store/slice/typeInputSlice";
import { vehicleFilter } from "../../../services/vihecleFilter";

function List() {
  const [view, setView] = useState({
    list: true,
    create: false,
    update: false,
    detail: false,
  });

  // Mover aquí todos los estados del TableComponent
  const [search, setSearch] = useState("");
  const [typeVehicleinput, settypeVehicleinput] = useState("---Todos---");
  const [companyinput, setcompanyinput] = useState("---Todos---");
  const [statusDesinfectioninput, setstatusDesinfectioninput] =
    useState("---Todos---");
  const [typeBurdeninput, settypeBurdeninput] = useState("---Todos---");
  const [typeCommunalinput, settypeCommunalinput] = useState("---Todos---");
  const [typeInputinput, settypeInputinput] = useState("---Todos---");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Redux setup
  const dispatch = useDispatch();
  const registerVehicle = useSelector((state) => state.registerVehicle.data);
  const typeVehicle = useSelector((state) => state.typeVehicle.data);
  const company = useSelector((state) => state.company.data);
  const statusDesinfection = useSelector(
    (state) => state.statusDesinfection.data
  );
  const typeBurden = useSelector((state) => state.typeBurden.data);
  const typeCommunal = useSelector((state) => state.typeCommunal.data);
  const typeInput = useSelector((state) => state.typeInput.data);

  // Mover efectos aquí
  useEffect(() => {
    dispatch(fetchtypeVehicle());
    dispatch(fetchCompany());
    dispatch(fetchregisterVehicleSlice());
    dispatch(fetchstatusDesinfection());
    dispatch(fetchTypeBurden());
    dispatch(fetchtypeCommunal());
    dispatch(fetchtypeInput());
  }, [dispatch]);

  useEffect(() => {
    const filtered = vehicleFilter(
      registerVehicle,
      typeVehicleinput,
      companyinput,
      statusDesinfectioninput,
      typeBurdeninput,
      typeCommunalinput,
      typeInputinput,
      search,
      startDate,
      endDate
    );
    setFilteredData(filtered);
  }, [
    registerVehicle,
    typeVehicleinput,
    companyinput,
    statusDesinfectioninput,
    typeBurdeninput,
    typeCommunalinput,
    typeInputinput,
    search,
    startDate,
    endDate,
  ]);

  // Mover handlers aquí
  const handleProjectChange = (e) => settypeVehicleinput(e.target.value);
  const handleCompanyChange = (e) => setcompanyinput(e.target.value);
  const handleStatusDesinfectionChange = (e) =>
    setstatusDesinfectioninput(e.target.value);
  const handleTypeBurdenChange = (e) => settypeBurdeninput(e.target.value);
  const handleTypeCommunalChange = (e) => settypeCommunalinput(e.target.value);
  const handleTypeInputChange = (e) => settypeInputinput(e.target.value);

  return (
    <>
      {view.list === true ? (
        <>
          <div className="flex-grow flex justify-center">
            <TableComponent
              setView={setView}
              //Pasar todos los estados y handlers como props
              search={search}
              setSearch={setSearch}
              typeVehicleinput={typeVehicleinput}
              companyinput={companyinput}
              statusDesinfectioninput={statusDesinfectioninput}
              typeBurdeninput={typeBurdeninput}
              typeCommunalinput={typeCommunalinput}
              typeInputinput={typeInputinput}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              filteredData={filteredData}
              handleProjectChange={handleProjectChange}
              handleCompanyChange={handleCompanyChange}
              handleStatusDesinfectionChange={handleStatusDesinfectionChange}
              handleTypeBurdenChange={handleTypeBurdenChange}
              handleTypeCommunalChange={handleTypeCommunalChange}
              handleTypeInputChange={handleTypeInputChange}
              typeVehicle={typeVehicle}
              company={company}
              statusDesinfection={statusDesinfection}
              typeBurden={typeBurden}
              typeCommunal={typeCommunal}
              typeInput={typeInput}
            />
          </div>
        </>
      ) : view.create === true ? (
        <Create setView={setView} />
      ) : view.detail === true ? (
        <DetailDesinfection setView={setView} />
      ) : (
        <></>
      )}
    </>
  );
}

export default List;
