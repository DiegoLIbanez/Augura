import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
//Redux
import { useSelector, useDispatch } from "react-redux";

//Slices
import { createRegisterVehicleSlice } from "../../../store/slice/registeVehicleSlice";
import { fetchvehicle } from "../../../store/slice/vehicleSlice";
import { fetchstatusDesinfection } from "../../../store/slice/statusDesinfectionSlice";
import { fetchTypeBurden } from "../../../store/slice/typeBurdenSlice";
import { fetchtypeCommunal } from "../../../store/slice/typeCommunalSlice";
import { fetchtypeInput } from "../../../store/slice/typeInputSlice";
import { fetchUserDriver } from "../../../store/slice/userSlice";

//Alert
import Swal from "sweetalert2";

const IdDriver = "67afbde815d0cc2bc6184486";

function Create({ setView }) {
  //State form
  const [vehicleInput, setVehicleInput] = useState("");
  const [userDriverInput, setUserDriverInput] = useState("");
  const [vehicleSelect, setVehicleSelect] = useState("");
  const [userDriverSelect, setUserDriverSelect] = useState("");
  const [statusDesinfectionSelect, setStatusDesinfectionSelect] = useState("");
  const [typeCommunalSelect, setTypeCommunalSelect] = useState("");
  const [typeBurdenSelect, setTypeBurdenSelect] = useState("");
  const [typeInputSelect, setTypeInputSelect] = useState("");
  const [initialDestinationInput, setInitialDestinationInput] = useState("");
  const [endDestinationInput, setEndDestinationInput] = useState("");

  //Get info redux
  // const infoRole = useSelector((store) => store.auth.data.role);
  const user = useSelector((state) => state.auth);
  const vehicle = useSelector((state) => state.vehicle.data);
  const userDriver = useSelector((state) => state.user.dataUserDriver);
  const statusDesinfection = useSelector(
    (state) => state.statusDesinfection.data
  );

  const typeCommunal = useSelector((state) => state.typeCommunal.data);
  const typeBurden = useSelector((state) => state.typeBurden.data);
  const typeInput = useSelector((state) => state.typeInput.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDriver(IdDriver));
    dispatch(fetchvehicle());
    dispatch(fetchstatusDesinfection());
    dispatch(fetchTypeBurden());
    dispatch(fetchtypeCommunal());
    dispatch(fetchtypeInput());
  }, []);

  const filteredVehicles = vehicle?.data?.filter((item) =>
    item.plate.toLowerCase().includes(vehicleInput.toLowerCase())
  );

  const filteredUserVehicle = userDriver?.data?.filter((item) =>
    item.dni.toLowerCase().includes(userDriverInput.toLowerCase())
  );

  const clearForm = () => {
    setVehicleInput("");
    setUserDriverInput("");
    setVehicleSelect("");
    setUserDriverSelect("");
    setStatusDesinfectionSelect("");
    setTypeCommunalSelect("");
    setTypeBurdenSelect("");
    setTypeInputSelect("");
    setInitialDestinationInput("");
    setEndDestinationInput("");
  };

  const showAlert = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      user: user?._id,
      driver: userDriverSelect,
      vehicle: vehicleSelect,
      statusDesinfection: statusDesinfectionSelect,
      typeBurden: typeBurdenSelect,
      typeCommunal: typeCommunalSelect,
      typeInput: typeInputSelect,
      initialDestination: initialDestinationInput,
      endDestination: endDestinationInput,
    };

    let responseData = await createRegisterVehicleSlice(body);
    switch (responseData.statusCode) {
      case 201:
        clearForm();
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          showConfirmButton: false,
          timer: 1500,
        });
        break;

      default:
        console.log("Error al guardar");
        break;
    }
  };

  return (
    <>
      {/* {
        infoRole === 'Administrador' ? 
          <>
            <button onClick={() => setView({ list:true })} className="bg-blue-500 rounded-lg text-center text-sm text-white w-full focus:outline-none focus:ring-4 focus:ring-blue-800 focus:ring-primary-300 font-medium hover:bg-blue-700 px-5 py-2.5" type="submit">
              Volver
            </button>
          </> : 
        <></>
      } */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-300 min-h-screen px-4 py-8"
      >
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto overflow-hidden">
          <h2 className="text-2xl text-center text-gray-800 font-bold mb-6">
            Registro de Desinfección
          </h2>

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            {/* Vehiculo */}
            <div>
              <label
                htmlFor="vehicle"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Vehículo
              </label>
              <input
                type="text"
                id="vehicle"
                value={vehicleInput}
                onChange={(e) => setVehicleInput(e.target.value)}
                placeholder="Vehículo"
                className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              />
              <select
                value={vehicleSelect}
                onChange={(e) => setVehicleSelect(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 outline-none px-4 py-2 transition-all"
              >
                <option value="">--Seleccionar--</option>
                {filteredVehicles?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.plate} - {item.company[0].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Conductor */}
            <div>
              <label
                htmlFor="driver"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Conductor
              </label>
              <input
                type="text"
                id="driver"
                value={userDriverInput}
                onChange={(e) => setUserDriverInput(e.target.value)}
                placeholder="Conductor"
                className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              />
              <select
                value={userDriverSelect}
                onChange={(e) => setUserDriverSelect(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2 outline-none px-4 py-2 transition-all"
              >
                <option value="">--Seleccionar--</option>
                {filteredUserVehicle?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.dni + " - " + item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado de desinfección */}
            <div>
              <label
                htmlFor="statusDesinfection"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Estado de Desinfección
              </label>
              <select
                value={statusDesinfectionSelect}
                onChange={(e) => setStatusDesinfectionSelect(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              >
                <option value="">--Seleccionar--</option>
                {statusDesinfection?.data?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Comunal */}
            <div>
              <label
                htmlFor="typeCommunal"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Comunal
              </label>
              <select
                value={typeCommunalSelect}
                onChange={(e) => setTypeCommunalSelect(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              >
                <option value="">--Seleccionar--</option>
                {typeCommunal?.data?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de carga */}
            <div>
              <label
                htmlFor="typeBurden"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Tipo de Carga
              </label>
              <select
                value={typeBurdenSelect}
                onChange={(e) => setTypeBurdenSelect(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              >
                <option value="">--Seleccionar--</option>
                {typeBurden?.data?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de insumo */}
            <div>
              <label
                htmlFor="typeInput"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Tipo de Insumo
              </label>
              <select
                value={typeInputSelect}
                onChange={(e) => setTypeInputSelect(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              >
                <option value="">--Seleccionar--</option>
                {typeInput?.data?.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Destino inicial */}
            <div>
              <label
                htmlFor="initialDestination"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Destino Inicial
              </label>
              <input
                type="text"
                id="initialDestination"
                value={initialDestinationInput}
                onChange={(e) => setInitialDestinationInput(e.target.value)}
                placeholder="Inicio de recorrido"
                className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              />
            </div>

            {/* Destino final */}
            <div>
              <label
                htmlFor="endDestination"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Destino Final
              </label>
              <input
                type="text"
                id="endDestination"
                value={endDestinationInput}
                onChange={(e) => setEndDestinationInput(e.target.value)}
                placeholder="Final del recorrido"
                className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              />
            </div>

            {/* Botón de Guardar */}
            <button
              type="submit"
              className="bg-blue-600 rounded-lg text-white w-full duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium hover:bg-blue-700 hover:scale-105 px-4 py-3 transform transition-all"
            >
              Guardar
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default Create;
