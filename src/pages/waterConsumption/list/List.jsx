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
          <button className="bg-green-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-green-400 px-4 py-2">
            Editar
          </button>
          <button className="bg-red-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-red-400 px-2 py-1">
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
              className="bg-blue-500 border-b-[4px] border-blue-600 rounded-lg text-white cursor-pointer hover:-translate-y-[1px] hover:brightness-110 px-6 py-2 transition-all"
              onClick={handlerCreate}
            >
              Crear Registro
            </button>
          </div>
          <div className="flex flex-grow justify-center">
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
