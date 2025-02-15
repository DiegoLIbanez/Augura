import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchregisterVehicleByIdSlice } from "../../store/slice/registeVehicleSlice";
import { useParams } from "react-router-dom";
import { fecha } from "../../services/formatDate";

const DetailDesinfection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const registerVehicleId = useSelector(
    (state) => state.registerVehicle.registerVehicleId.data
  );

  useEffect(() => {
    dispatch(fetchregisterVehicleByIdSlice(id));
  }, [dispatch, id]);

  if (!registerVehicleId || registerVehicleId.length === 0) {
    return <div>Cargando...</div>;
  }

  const vehicle = registerVehicleId[0]?.vehicle?.[0] || {};
  const person = registerVehicleId[0]?.person?.[0] || {};

  const statusDesinfection =
    registerVehicleId[0]?.statusDesinfection?.[0] || {};
  const typeBurden = registerVehicleId[0]?.typeBurden?.[0] || {};
  const typeCommunal = registerVehicleId[0]?.typeCommunal?.[0] || {};
  const typeInput = registerVehicleId[0]?.typeInput?.[0] || {};

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-4 md:p-14 gap-4">
      {/* Sección Derecha - Información */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {vehicle.plate || "Detalle de Desinfección"}
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Cédula" value={person.dni} />
          <InfoItem label="Nombre" value={person.name} />
          <InfoItem label="Teléfono" value={person.phoneNumber} />

          <InfoItem
            label="Fecha de Registro"
            value={fecha(registerVehicleId[0]?.createdAt)}
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
            value={registerVehicleId[0]?.initialDestination}
          />
          <InfoItem
            label="Destino Finca"
            value={registerVehicleId[0]?.endDestination}
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
