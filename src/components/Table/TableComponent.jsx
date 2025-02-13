import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchregisterVehicleSlice } from "../../store/slice/registeVehicleSlice";
import { fetchtypeVehicle } from "../../store/slice/typeVehicleSlice";
import { fetchstatusDesinfection } from "../../store/slice/statusDesinfectionSlice";
import { fetchTypeBurden } from "../../store/slice/typeBurdenSlice";
import { fetchtypeCommunal } from "../../store/slice/typeCommunalSlice";
import { fetchtypeInput } from "../../store/slice/typeInputSlice";

function vehicleFilter(
  state,
  typeVehicleId,
  companyId,
  statusDesinfectionId,
  typeBurdenId,
  typeCommunalId,
  typeInputId,
  searchTerm
) {
  return (
    state?.data?.filter((item) => {
      const searchLower = searchTerm.trim().toLowerCase();

      const matchesTypeVehicle =
        typeVehicleId === "---Todos---" ||
        item.vehicle?.[0]?.typeVehicle?.[0]?._id === typeVehicleId;

      const matchesCompany =
        companyId === "---Todos---" ||
        item.vehicle?.[0]?.company?.[0]?._id === companyId;

      const matchesStatusDesinfection =
        statusDesinfectionId === "---Todos---" ||
        item.statusDesinfection?.[0]?._id === statusDesinfectionId;
      const matchesTypeBurden =
        typeBurdenId === "---Todos---" ||
        item.typeBurden?.[0]?._id === typeBurdenId;

      const matchesTypeCommunal =
        typeCommunalId === "---Todos---" ||
        item.typeCommunal?.[0]?._id === typeCommunalId;

      const matchesTypeInput =
        typeInputId === "---Todos---" ||
        item.typeInput?.[0]?._id === typeInputId;

      const matchesSearch =
        searchLower === "" ||
        item.person?.[0]?.dni?.toLowerCase().includes(searchLower) ||
        item.person?.[0]?.name?.toLowerCase().includes(searchLower) ||
        item.vehicle?.[0]?.plate?.toLowerCase().includes(searchLower) ||
        item.vehicle?.[0]?.typeVehicle?.[0]?.description
          ?.toLowerCase()
          .includes(searchLower) ||
        item.vehicle?.[0]?.company?.[0]?.name
          ?.toLowerCase()
          .includes(searchLower) ||
        item.statusDesinfection?.[0]?.description
          ?.toLowerCase()
          .includes(searchLower) ||
        item.typeBurden?.[0]?.description
          ?.toLowerCase()
          .includes(searchLower) ||
        item.typeCommunal?.[0]?.description
          ?.toLowerCase()
          .includes(searchLower) ||
        item.typeInput?.[0]?.description?.toLowerCase().includes(searchLower) ||
        item.initialDestination?.toLowerCase().includes(searchLower) ||
        item.endDestination?.toLowerCase().includes(searchLower);

      return (
        matchesTypeVehicle &&
        matchesCompany &&
        matchesStatusDesinfection &&
        matchesTypeBurden &&
        matchesTypeCommunal &&
        matchesTypeInput &&
        matchesSearch
      );
    }) || []
  );
}

function TableComponent() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [typeVehicleinput, settypeVehicleinput] = useState("---Todos---");
  const [companyinput, setcompanyinput] = useState("---Todos---");
  const [statusDesinfectioninput, setstatusDesinfectioninput] =
    useState("---Todos---");
  const [typeBurdeninput, settypeBurdeninput] = useState("---Todos---");
  const [typeCommunalinput, settypeCommunalinput] = useState("---Todos---");
  const [typeInputinput, settypeInputinput] = useState("---Todos---");
  const [filteredData, setFilteredData] = useState([]);

  const { registerVehicle } = useSelector((state) => state.registerVehicle);
  const { typeVehicle } = useSelector((state) => state.typeVehicle);
  const { company } = useSelector((state) => state.company);
  const { statusDesinfection } = useSelector(
    (state) => state.statusDesinfection
  );
  const { typeBurden } = useSelector((state) => state.typeBurden);
  const { typeCommunal } = useSelector((state) => state.typeCommunal);
  const { typeInput } = useSelector((state) => state.typeInput);

  const fecha = (dateMongo) => {
    const date = new Date(dateMongo);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0-11
    const año = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
  };

  useEffect(() => {
    dispatch(fetchtypeVehicle());
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
      search
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
  ]);

  const handleProjectChange = (e) => settypeVehicleinput(e.target.value);
  const handleCompanyChange = (e) => setcompanyinput(e.target.value);
  const handleStatusDesinfectionChange = (e) =>
    setstatusDesinfectioninput(e.target.value);
  const handleTypeBurdenChange = (e) => settypeBurdeninput(e.target.value);
  const handleTypeCommunalChange = (e) => settypeCommunalinput(e.target.value);
  const handleTypeInputChange = (e) => settypeInputinput(e.target.value);

  return (
    <>
      <div className="flex flex-col w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-3 mt-1 pl-3">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex flex-col mb-3 sm:mb-0">
              <label
                htmlFor="project"
                className="text-sm font-medium text-slate-800 text-center"
              >
                Tipo de Veiculo
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

        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-900">
                    Cedula
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Nombre
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Telefono
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Rol
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    status
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Placa
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Tipo de Veiculo
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Compañia
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Estado de Desinfeccion
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Tipo de Carga
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Tipo de Comunal
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Tipo de insumo
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Destino Inicial
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Destino Finca
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none ext-slate-900">
                    Fecha Registro
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="15"
                    className="text-center p-4 text-sm text-slate-500"
                  >
                    No hay registros
                  </td>
                </tr>
              ) : (
                filteredData.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.person[0].dni}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.person[0].name}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.person[0].phoneNumber}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.person[0].role.description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.person[0].status.description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.vehicle[0].plate}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.vehicle[0].typeVehicle[0].description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.vehicle[0].company[0].name}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.statusDesinfection[0].description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.typeBurden[0].description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.typeCommunal[0].description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.typeInput[0].description}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.initialDestination}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {item.endDestination}
                      </p>
                    </td>
                    <td className="p-4 py-2">
                      <p className="text-sm text-slate-500">
                        {fecha(item.createdAt)}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-between  items-center px-4">
            <div className="text-sm text-slate-500">
              Showing <b>1-5</b> of 45
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                1
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                2
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                3
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableComponent;
