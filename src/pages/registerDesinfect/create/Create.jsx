import React,{ useEffect,useState } from 'react';

//Redux
import { useSelector,useDispatch } from "react-redux";

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

const IdDriver = '67afbde815d0cc2bc6184486';

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
  const infoRole = useSelector((store) => store.auth.data.role);
  const user = useSelector((state) => state.auth.data);
  const vehicle = useSelector((state) => state.vehicle.data);
  const userDriver = useSelector((state) => state.user.dataUserDriver);
  const statusDesinfection = useSelector((state) => state.statusDesinfection.data);
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
  }, [])

  // useEffect(() => {
    // console.log(userDriver.data);
    // console.log(vehicle.data);
    // console.log(statusDesinfection);
    // console.log(typeCommunal);
    // console.log(typeBurden);
    // console.log(typeInput);    
  // }, [userDriver,vehicle,statusDesinfection,typeCommunal,typeBurden,typeInput])
  
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
      person:user.id,
      driver:userDriverSelect,
      vehicle:vehicleSelect,
      statusDesinfection:statusDesinfectionSelect,
      typeBurden:typeBurdenSelect,
      typeCommunal:typeCommunalSelect,
      typeInput:typeInputSelect,
      initialDestination:initialDestinationInput,
      endDestination:endDestinationInput
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
  }



  return (
    <>
      {/* {
        infoRole === 'Administrador' ? 
          <>
            <button onClick={() => setView({ list:true })} className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
              Volver
            </button>
          </> : 
        <></>
      } */}

       <div className="min-h-screen bg-gray-200 py-8 px-4">
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Registro de Desinfección
    </h2>

    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {/* Vehiculo */}
      <div>
        <label
          htmlFor="vehicle"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Vehículo
        </label>
        <input
          type="text"
          id="vehicle"
          value={vehicleInput}
          onChange={(e) => setVehicleInput(e.target.value)}
          placeholder="Vehículo"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <select
          value={vehicleSelect}
          onChange={(e) => setVehicleSelect(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option value="">--Seleccionar--</option>
          {filteredVehicles?.map((item) => (
            <option value={item._id} key={item._id}>
              {item.plate}
            </option>
          ))}
        </select>
      </div>

      {/* Conductor */}
      <div>
        <label
          htmlFor="driver"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Conductor
        </label>
        <input
          type="text"
          id="driver"
          value={userDriverInput}
          onChange={(e) => setUserDriverInput(e.target.value)}
          placeholder="Conductor"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <select
          value={userDriverSelect}
          onChange={(e) => setUserDriverSelect(e.target.value)}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
        >
          <option value="">--Seleccionar--</option>
          {filteredUserVehicle?.map((item) => (
            <option value={item._id} key={item._id}>
              {item.dni + ' - ' + item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Estado de desinfección */}
      <div>
        <label
          htmlFor="statusDesinfection"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Estado de Desinfección
        </label>
        <select
          value={statusDesinfectionSelect}
          onChange={(e) => setStatusDesinfectionSelect(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Comunal
        </label>
        <select
          value={typeCommunalSelect}
          onChange={(e) => setTypeCommunalSelect(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tipo de Carga
        </label>
        <select
          value={typeBurdenSelect}
          onChange={(e) => setTypeBurdenSelect(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tipo de Insumo
        </label>
        <select
          value={typeInputSelect}
          onChange={(e) => setTypeInputSelect(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Destino Inicial
        </label>
        <input
          type="text"
          id="initialDestination"
          value={initialDestinationInput}
          onChange={(e) => setInitialDestinationInput(e.target.value)}
          placeholder="Inicio de recorrido"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      {/* Destino final */}
      <div>
        <label
          htmlFor="endDestination"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Destino Final
        </label>
        <input
          type="text"
          id="endDestination"
          value={endDestinationInput}
          onChange={(e) => setEndDestinationInput(e.target.value)}
          placeholder="Final del recorrido"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      {/* Botón de Guardar */}
      <button
        type="submit"
      
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Guardar
      </button>
    </form>
  </div>
</div>

    </>
  )
}

export default Create

