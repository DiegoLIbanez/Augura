import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FilterDate from "../../components/FilterDate/FilterDate";
import Graphics from "../../components/graphics/Graphics";

import { SummaryBox } from "../../components/SummaryBox/SummaryBox";
import { processDataForChart } from "../../services/processDataForChart";
import { FilterSelect } from "../../components/FilterSelect/FilterSelect";
import { fetchregisterVehicleSlice } from "../../store/slice/registeVehicleSlice";
import { fetchWaterConsumption } from "../../store/slice/waterConsumtionSlice";
import { fetchtypeCommunal } from "../../store/slice/typeCommunalSlice";

const List = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState({
    list: true,
    create: false,
    update: false,
    detail: false,
  });
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataType, setDataType] = useState("desinfection");
  const [communalFilter, setCommunalFilter] = useState("all");

  const registerVehicle = useSelector((state) => state.registerVehicle.data);
  const waterConsumption = useSelector((state) => state.waterConsumption.data);
  const typeCommunal = useSelector((state) => state.typeCommunal.data);

  useEffect(() => {
    dispatch(fetchregisterVehicleSlice());
    dispatch(fetchWaterConsumption());
    dispatch(fetchtypeCommunal());
  }, [dispatch]);

  const chartData = processDataForChart(
    dataType,
    registerVehicle || [],
    waterConsumption || [],
    startDate,
    endDate,
    communalFilter,
    filter
  );

  return (
    <>
      {view.list === true ? (
        <>
          <FilterDate
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="container mx-auto p-4">
            {/* Selector "Mostrar:" */}
            <FilterSelect
              label="Mostrar"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              options={[
                { value: "desinfection", label: "Estados de Desinfección" },
                { value: "waterConsumption", label: "Consumo de Agua" },
              ]}
              className="mb-4"
            />

            {/* Grupo de filtros */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                {dataType === "desinfection" && (
                  <FilterSelect
                    label="Filtrar por estado de desinfección"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    options={[
                      { value: "all", label: "---Todos---" },
                      { value: "desinfected", label: "Desinfectados" },
                      { value: "notDesinfected", label: "No desinfectados" },
                    ]}
                  />
                )}

                <FilterSelect
                  label="Filtrar por comunal"
                  value={communalFilter}
                  onChange={(e) => setCommunalFilter(e.target.value)}
                  options={[
                    { value: "all", label: "---Todos---" },
                    ...(typeCommunal?.data?.map((item) => ({
                      value: item.description,
                      label: item.description,
                    })) || []),
                  ]}
                />
              </div>

              {/* Resumen numérico */}
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                {dataType === "desinfection" ? (
                  <>
                    <SummaryBox
                      label="Vehículos No Desinfectados"
                      value={chartData.totalNotDesinfected}
                      bgColor="bg-red-100"
                      textColor="text-red-700"
                    />
                    <SummaryBox
                      label="Vehículos Desinfectados"
                      value={chartData.totalDesinfected}
                      bgColor="bg-green-100"
                      textColor="text-green-700"
                    />
                  </>
                ) : (
                  <>
                    <SummaryBox
                      label="Consumo Total de Agua"
                      value={`${chartData.totalWaterConsumption.toLocaleString()} litros`}
                      bgColor="bg-blue-100"
                      textColor="text-blue-700"
                    />
                    <SummaryBox
                      label="Consumo Total de Desinfectante"
                      value={`${chartData.totalDisinfectantConsumption.toLocaleString()} litros`}
                      bgColor="bg-yellow-100"
                      textColor="text-yellow-700"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Gráfica */}
            <div className="mt-6">
              <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                <Graphics data={chartData} dataType={dataType} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default List;
