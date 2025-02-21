import React, { useEffect, useState } from "react";

//Components
import TableComponent from "../../../components/Table/TableComponent";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Funtions for excel
import { utils, writeFile } from "xlsx";
import { transformDataForExport } from "../../../services/transformDataForExport";

//Date
import { fecha } from "../../../services/formatDate";

//Alerts
// import Swal from "sweetalert2";

//Views
// import Create from "../create/Create";
// import DetailDesinfection from "../detail/DetailDesinfection";

//Slices
import { fetchtypeVehicle } from "../../../store/slice/typeVehicleSlice";
import { fetchCompany } from "../../../store/slice/companySlice";
import { fetchregisterVehicleSlice, fetchregisterVehicleByIdSlice } from "../../../store/slice/registeVehicleSlice";
import { fetchstatusDesinfection } from "../../../store/slice/statusDesinfectionSlice";
import { fetchTypeBurden } from "../../../store/slice/typeBurdenSlice";
import { fetchtypeCommunal } from "../../../store/slice/typeCommunalSlice";
import { fetchtypeInput } from "../../../store/slice/typeInputSlice";
import { vehicleFilter } from "../../../services/vehicleFilter";

function List() {
  // Redux setup
  const dispatch = useDispatch();

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
  const [statusDesinfectioninput, setstatusDesinfectioninput] = useState("---Todos---");
  const [typeBurdeninput, settypeBurdeninput] = useState("---Todos---");
  const [typeCommunalinput, settypeCommunalinput] = useState("---Todos---");
  const [typeInputinput, settypeInputinput] = useState("---Todos---");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //Cargar la data
  const dataList = useSelector((state) => state.registerVehicle?.data ?? []);
  const typeVehicle = useSelector((state) => state.typeVehicle.data);
  const company = useSelector((state) => state.company.data);
  const statusDesinfection = useSelector((state) => state.statusDesinfection.data);
  const typeBurden = useSelector((state) => state.typeBurden.data);
  const typeCommunal = useSelector((state) => state.typeCommunal.data);
  const typeInput = useSelector((state) => state.typeInput.data);

  const header = [
    { name: "Cedula" },
    { name: "Nombre" },
    { name: "Teléfono" },
    { name: "Rol" },
    { name: "Estatus" },
    { name: "Placa" },
    { name: "Tipo de Vehiculo" },
    { name: "Compañia" },
    { name: "Estado de Desinfeccion" },
    { name: "Tipo de Carga" },
    { name: "Tipo de Comunal" },
    { name: "Tipo de insumo" },
    { name: "Destino Inicial" },
    { name: "Destino Final" },
    { name: "Fecha Registro" },
    { name: "Acciones" },
  ];

  const columns = [
    { header: "Dni", render: (item) => item?.person?.[0]?.dni || "N/A" },
    { header: "Nombre", render: (item) => item?.person?.[0]?.name || "N/A" },
    {
      header: "Teléfono",
      render: (item) => item?.person?.[0]?.phoneNumber || "N/A",
    },
    {
      header: "Rol",
      render: (item) => item?.person?.[0]?.role?.description || "N/A",
    },
    {
      header: "Status",
      render: (item) => item?.person[0].status.description || "N/A",
    },
    { header: "Placa", render: (item) => item?.vehicle[0].plate || "N/A" },
    {
      header: "Tipo de Vehiculo",
      render: (item) => item?.vehicle[0].typeVehicle[0].description || "N/A",
    },
    {
      header: "Compañia",
      render: (item) => item?.vehicle[0].company[0].name || "N/A",
    },
    {
      header: "Estado de Desinfeccion",
      render: (item) => item?.statusDesinfection[0].description || "N/A",
    },
    {
      header: "Tipo de Carga",
      render: (item) => item?.typeBurden[0].description || "N/A",
    },
    {
      header: "Tipo de Comunal",
      render: (item) => item?.typeCommunal[0].description || "N/A",
    },
    {
      header: "Tipo de insumo",
      render: (item) => item?.typeInput[0].description || "N/A",
    },
    {
      header: "Destino Inicial",
      render: (item) => item?.initialDestination || "N/A",
    },
    {
      header: "Destino Final",
      render: (item) => item?.endDestination || "N/A",
    },
    {
      header: "Fecha Registro",
      render: (item) => fecha(item.createdAt) || "N/A",
    },
    {
      header: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-yellow-500 text-white rounded">
            Editar
          </button>
          <button className="px-2 py-1 bg-blue-500 text-white rounded">
            Detalle
          </button>
        </div>
      ),
    },
  ];

  {
    /* <button onClick={() => handleEdit(item)} className="px-2 py-1 bg-yellow-500 text-white rounded">
      Editar
    </button>
    <button onClick={() => handleDetail(item)} className="px-2 py-1 bg-blue-500 text-white rounded">
      Detalle
    </button> */
  }

  //dispatch
  const countVehicleDesinfection = filteredData.filter((data) => data.statusDesinfection[0].description === "NO");
  const countVehicleNoDesinfection = filteredData.filter((data) => data.statusDesinfection[0].description === "SI");

  const tableProps = {
    header,
    columns,
  };

  // Cargar los datos
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
      dataList,
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
    dataList,
    typeVehicleinput,
    companyinput,
    statusDesinfectioninput,
    typeBurdeninput,
    typeCommunalinput,
    typeInputinput,
    search,
    startDate,
    endDate
  ]);

  // Manejo de los cambios en los filtros
  const handleProjectChange = (e) => settypeVehicleinput(e.target.value);
  const handleCompanyChange = (e) => setcompanyinput(e.target.value);
  const handleStatusDesinfectionChange = (e) => setstatusDesinfectioninput(e.target.value);
  const handleTypeBurdenChange = (e) => settypeBurdeninput(e.target.value);
  const handleTypeCommunalChange = (e) => settypeCommunalinput(e.target.value);
  const handleTypeInputChange = (e) => settypeInputinput(e.target.value);

  // // Funcion para exportar
  const handleExport = (exportAll = false) => {
    const sourceData = exportAll ? dataList || [] : filteredData;
    if (!sourceData || sourceData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No hay datos para exportar",
      });
      return;
    }

    try {
      const transformedData = transformDataForExport(sourceData, fecha);
      const worksheet = utils.json_to_sheet(transformedData);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Datos");
      writeFile(
        workbook,
        `${exportAll ? "Todos_los_datos" : "Datos_filtrados"}.xlsx`
      );
    } catch (error) {
      console.error("Error al exportar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al exportar los datos",
      });
    }
  };

  const handleIdChange = (e) => {
    dispatch(fetchregisterVehicleByIdSlice(e));
  };

  const handleClickprb = (id) => {
    setView({ detail: true });
    dispatch(fetchregisterVehicleByIdSlice(id));
  };

  // useEffect(() => {
  //   console.log(dataList);
  // }, [dataList])

  return (
    <>
      {view.list === true ? (
        <>
          <div className="flex flex-col w-full mx-auto gap-9 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row lg:w-1/2 md:w-full gap-6 p-4">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium text-slate-800">
                  Fecha Inicial
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium text-slate-800">
                  Fecha Final
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="h-[42px] px-4 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  Limpiar fechas
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
              <div className="flex gap-6">
                <button
                  onClick={() => handleExport(false)}
                  className="h-[42px] px-4 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Exportar Filtrados
                </button>
                <button
                  onClick={() => handleExport(true)}
                  className="h-[42px] px-4 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Exportar Todos
                </button>
              </div>

              <div className="flex gap-4">
                <div className="bg-red-100 px-3 py-1 rounded-md">
                  <span className="text-red-700 font-medium">
                    Vehiculos No Desinfectados:{" "}
                    {countVehicleDesinfection.length}
                  </span>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-md">
                  <span className="text-green-700 font-medium">
                    Vehiculos Desinfectados: {countVehicleNoDesinfection.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-3 mt-1 pl-3">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <label
                      htmlFor="project"
                      className="text-sm font-medium text-slate-800 text-center"
                    >
                      Tipo de Vehiculo
                    </label>
                    <select
                      value={typeVehicleinput}
                      onChange={handleProjectChange}
                      id="project"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>---Todos---</option>
                      {typeVehicle?.data?.map((item, i) => (
                        <option value={item._id} key={i}>
                          {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-slate-800 text-center"
                    >
                      Compañia
                    </label>
                    <select
                      value={companyinput}
                      onChange={handleCompanyChange}
                      id="company"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>---Todos---</option>
                      {company?.data?.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <label className="text-sm font-medium text-slate-800 text-center">
                      Estado de Desinfeccion
                    </label>
                    <select
                      value={statusDesinfectioninput}
                      onChange={handleStatusDesinfectionChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>---Todos---</option>
                      {statusDesinfection?.data?.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <label
                      htmlFor="project"
                      className="text-sm font-medium text-slate-800 text-center"
                    >
                      Tipo de Carga
                    </label>
                    <select
                      value={typeBurdeninput}
                      onChange={handleTypeBurdenChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>---Todos---</option>
                      {typeBurden?.data?.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-slate-800 text-center"
                    >
                      Tipo de Comunal
                    </label>
                    <select
                      value={typeCommunalinput}
                      onChange={handleTypeCommunalChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>---Todos---</option>
                      {typeCommunal?.data?.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-slate-800 text-center"
                    >
                      Tipo de insumo
                    </label>
                    <select
                      value={typeInputinput}
                      onChange={handleTypeInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>---Todos---</option>
                      {typeInput?.data?.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="w-full max-w-sm min-w-[200px] relative mt-3 sm:mt-0 sm:ml-auto">
                  <div className="relative">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className=" w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                      placeholder="Search for..."
                    />
                    <button
                      className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="w-8 h-8 text-slate-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <TableComponent setView={setView} dataList={filteredData} {...tableProps} />
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
