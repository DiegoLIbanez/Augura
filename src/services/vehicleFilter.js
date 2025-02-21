export function vehicleFilter(
    state,
    typeVehicleId,
    companyId,
    statusDesinfectionId,
    typeBurdenId,
    typeCommunalId,
    typeInputId,
    searchTerm,
    startDate,
    endDate
  ) {
    return (
      state?.filter((item) => {
        const searchLower = searchTerm.trim().toLowerCase();
  
        // Filtro por fecha (solo fecha)
        const itemDate = new Date(item.createdAt);
        itemDate.setHours(0, 0, 0, 0); // Normalizar a medianoche
  
        let start = null;
        if (startDate) {
          const [year, month, day] = startDate.split("-");
          start = new Date(year, month - 1, day);
        }
  
        let end = null;
        if (endDate) {
          const [year, month, day] = endDate.split("-");
          end = new Date(year, month - 1, day);
          end.setHours(23, 59, 59, 999); // Fin del día
        }
  
        let matchesDate = true;
        if (start && end) {
          matchesDate = itemDate >= start && itemDate <= end;
        } else if (start) {
          matchesDate = itemDate >= start;
        } else if (end) {
          matchesDate = itemDate <= end;
        }
  
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
          matchesSearch &&
          matchesDate
        );
      }) || []
    );
  }