export const transformDataForExport = (data, fecha) => {
  return data.map((item) => ({
    Cédula: item.person?.[0]?.dni || "",
    Nombre: item.person?.[0]?.name || "",
    Teléfono: item.person?.[0]?.phoneNumber || "",
    Rol: item.person?.[0]?.role?.description || "",
    Estado: item.person?.[0]?.status?.description || "",
    Placa: item.vehicle?.[0]?.plate || "",
    "Tipo de Vehículo": item.vehicle?.[0]?.typeVehicle?.[0]?.description || "",
    Compañía: item.vehicle?.[0]?.company?.[0]?.name || "",
    "Estado Desinfección": item.statusDesinfection?.[0]?.description || "",
    "Tipo de Carga": item.typeBurden?.[0]?.description || "",
    "Tipo Comunal": item.typeCommunal?.[0]?.description || "",
    "Tipo Insumo": item.typeInput?.[0]?.description || "",
    "Destino Inicial": item.initialDestination || "",
    "Destino Finca": item.endDestination || "",
    "Fecha Registro": fecha(item.createdAt),
  }));
};
