export const processDataForChart = (
  dataType,
  registerVehicle,
  waterConsumption,
  startDate,
  endDate,
  communalFilter,
  filter
) => {
  if (dataType === "desinfection") {
    // Procesar datos de desinfección
    const dataByDate = {};
    let totalDesinfected = 0;
    let totalNotDesinfected = 0;

    if (registerVehicle?.data && Array.isArray(registerVehicle.data)) {
      registerVehicle?.data?.forEach((item) => {
        const itemDate = new Date(item.createdAt);
        const date = itemDate.toLocaleDateString();

        // Filtro por fecha
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);

          // Excluir elementos fuera del rango
          if (itemDate < start || itemDate > end) {
            return;
          }
        }

        // Filtro por comunal
        if (
          communalFilter !== "all" &&
          !item?.typeCommunal?.some(
            (communal) => communal.description === communalFilter
          )
        ) {
          return;
        }

        if (item.statusDesinfection && Array.isArray(item.statusDesinfection)) {
          if (!dataByDate[date]) {
            dataByDate[date] = { desinfected: 0, notDesinfected: 0 };
          }

          if (filter === "all" || filter === "desinfected") {
            if (item.statusDesinfection[0]?.description === "SI") {
              dataByDate[date].desinfected += 1;
              totalDesinfected += 1;
            }
          }

          if (filter === "all" || filter === "notDesinfected") {
            if (item.statusDesinfection[0]?.description === "NO") {
              dataByDate[date].notDesinfected += 1;
              totalNotDesinfected += 1;
            }
          }
        }
      });
    }

    const labels = Object.keys(dataByDate);
    const desinfected = labels.map((date) => dataByDate[date].desinfected);
    const notDesinfected = labels.map(
      (date) => dataByDate[date].notDesinfected
    );

    return {
      labels,
      desinfected,
      notDesinfected,
      totalDesinfected,
      totalNotDesinfected,
    };
  } else if (dataType === "waterConsumption") {
    // Procesar datos de consumo de agua y desinfectante
    const dataByDate = {};
    let totalWaterConsumption = 0;
    let totalDisinfectantConsumption = 0;

    if (waterConsumption?.data && Array.isArray(waterConsumption.data)) {
      waterConsumption?.data?.forEach((item) => {
        const itemDate = new Date(item.dateNow);
        const date = itemDate.toLocaleDateString();

        // Filtro por fecha
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);

          // Excluir elementos fuera del rango
          if (itemDate < start || itemDate > end) {
            return;
          }
        }

        // Filtro por comunal
        if (
          communalFilter !== "all" &&
          item?.typeCommunal[0]?.description !== communalFilter // Asegúrate de que `item.communal` sea el campo correcto
        ) {
          return;
        }

        if (!dataByDate[date]) {
          dataByDate[date] = {
            waterConsumption: 0,
            disinfectantConsumption: 0,
          };
        }

        // Convertir y validar el consumo de agua
        const water = parseInt(item.waterConsumption, 10);
        if (!isNaN(water)) {
          dataByDate[date].waterConsumption += water;
          totalWaterConsumption += water;
        }

        // Convertir y validar el consumo de desinfectante
        const disinfectant = parseInt(item.disinfectantConsumption, 10);
        if (!isNaN(disinfectant)) {
          dataByDate[date].disinfectantConsumption += disinfectant;
          totalDisinfectantConsumption += disinfectant;
        }
      });
    }

    const labels = Object.keys(dataByDate);
    const waterConsumptionData = labels.map(
      (date) => dataByDate[date].waterConsumption
    );
    const disinfectantConsumptionData = labels.map(
      (date) => dataByDate[date].disinfectantConsumption
    );

    return {
      labels,
      waterConsumption: waterConsumptionData,
      disinfectantConsumption: disinfectantConsumptionData,
      totalWaterConsumption,
      totalDisinfectantConsumption,
    };
  }

  // Retorno por defecto si no se cumple ninguna condición
  return {
    labels: [],
    desinfected: [],
    notDesinfected: [],
    totalDesinfected: 0,
    totalNotDesinfected: 0,
    waterConsumption: [],
    disinfectantConsumption: [],
    totalWaterConsumption: 0,
    totalDisinfectantConsumption: 0,
  };
};
