import React, { useState, useEffect } from "react";
import Create from "../create/Create";

//Pages
import TableComponent from "../../../components/Table/TableComponent";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Slice
import { fetchWaterConsumption } from "../../../store/slice/waterConsumtionSlice";
import { fecha } from "../../../services/formatDate";

const List = () => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.waterConsumption?.data ?? []);

  const [view, setView] = useState({
    list: true,
    create: false,
    update: false,
    detail: false,
  });

  const header = [
    { name: "Consumo de agua" },
    { name: "Consumo de desinfectante" },
    { name: "Tipo comunal" },
    { name: "Fecha" },
    { name: "Acciones" },
  ];

  const columns = [
    {
      header: "Consumo de agua",
      render: (item) => item?.waterConsumption || "N/A",
    },
    {
      header: "Consumo de desinfectante",
      render: (item) => item?.disinfectantConsumption || "N/A",
    },
    {
      header: "Tipo comunal",
      render: (item) => item?.typeCommunal[0]?.description || "N/A",
    },
    { header: "Tipo comunal", render: (item) => fecha(item?.dateNow) || "N/A" },
    {
      header: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Editar
          </button>
          <button className="px-2 py-1 bg-red-500 text-white rounded">
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const tableProps = {
    header,
    columns,
  };

  useEffect(() => {
    dispatch(fetchWaterConsumption());
  }, [dispatch, view]);

  const handlerCreate = () => {
    setView({ create: true });
  };

  return (
    <>
      {view.list === true ? (
        <>
          <div className="mb-8">
            <button
              className=" cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]"
              onClick={handlerCreate}
            >
              Crear Registro
            </button>
          </div>
          <div className="flex-grow flex justify-center">
            <TableComponent
              setView={setView}
              dataList={dataList}
              {...tableProps}
            />
          </div>
        </>
      ) : view.create === true ? (
        <Create setView={setView} />
      ) : view.detail === true ? (
        // <DetailDesinfection setView={setView} />
        <></>
      ) : (
        <></>
      )}
    </>
  );
};

export default List;
