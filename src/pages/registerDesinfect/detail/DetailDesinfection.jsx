import React from "react";
import { fecha } from "../../../services/formatDate";

const DetailDesinfection = ({ detailVehicle }) => {
  const vehicle = detailVehicle.vehicle[0] || {};
  const driver = detailVehicle.driver[0] || {};
  const statusDesinfection = detailVehicle.statusDesinfection[0] || {};
  const typeBurden = detailVehicle.typeBurden[0] || {};
  const typeCommunal = detailVehicle.typeCommunal[0] || {};
  const typeInput = detailVehicle.typeInput[0] || {};

  // const handleReturn = () => {
  //   setView({})
  // };

  return (
    <>
      {/* <div className="container mx-auto p-4">
        <button
          className=" cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]"
          onClick={handleReturn}
        >
          Volver
        </button>
      </div> */}

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-4 md:p-14 gap-4">
        {/* Sección Derecha - Información */}

        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {vehicle.plate || "Detalle de Desinfección"}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Cédula" value={driver.dni} />
            <InfoItem
              label="Nombre del Coductor"
              value={`${driver.name} ${driver.lastname}`}
            />
            <InfoItem label="Teléfono" value={driver.phoneNumber} />

            <InfoItem
              label="Fecha de Registro"
              value={fecha(detailVehicle.createdAt)}
            />
            <InfoItem label="Placa" value={vehicle.plate} />
            <InfoItem
              label="Tipo de Vehículo"
              value={vehicle.typeVehicle?.[0]?.description}
            />
            <InfoItem label="Compañía" value={vehicle.company?.[0]?.name} />
            <InfoItem
              label="Estado Desinfección"
              value={statusDesinfection.description}
              statusColor
            />
            <InfoItem label="Tipo de Carga" value={typeBurden.description} />
            <InfoItem label="Tipo Comunal" value={typeCommunal.description} />
            <InfoItem label="Tipo Insumo" value={typeInput.description} />
            <InfoItem
              label="Destino Inicial"
              value={detailVehicle.initialDestination}
            />
            <InfoItem
              label="Destino Finca"
              value={detailVehicle.endDestination}
            />
          </div>
        </div>
        {/* Sección Izquierda - Imagen */}
        <div className="w-full md:w-1/2">
          <div className="relative h-full rounded-xl shadow-lg overflow-hidden">
            <img
              src={vehicle.photoVehicle}
              alt="Vehículo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Componente auxiliar para mostrar los items
const InfoItem = ({ label, value, statusColor, fullWidth }) => (
  <div className={`${fullWidth ? "col-span-2" : ""}`}>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p
      className={`font-medium ${
        statusColor ? (value === "SI" ? "text-green-600" : "text-red-600") : ""
      }`}
    >
      {typeof value === "object" ? JSON.stringify(value) : value || "N/A"}
    </p>
  </div>
);

export default DetailDesinfection;
