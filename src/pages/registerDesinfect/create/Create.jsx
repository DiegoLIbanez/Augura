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

  const handleSubmit = async () => {
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
      {
        infoRole === 'Administrador' ? 
          <>
            <button onClick={() => setView({ list:true })} className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
              Volver
            </button>
          </> : 
        <></>
      }

      
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">

            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Vehiculo
                </label>

                <input value={vehicleInput} onChange={(e) => setVehicleInput(e.target.value)} placeholder="Vehiculo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />                
                
                <select value={vehicleSelect} onChange={(e) => setVehicleSelect(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Seleccionar--</option>
                  {filteredVehicles?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.plate}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Conductor
                </label>

                <input value={userDriverInput} onChange={(e) => setUserDriverInput(e.target.value)} placeholder="Conductor" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />                
                
                <select value={userDriverSelect} onChange={(e) => setUserDriverSelect(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Seleccionar--</option>
                  {filteredUserVehicle?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.dni + ' - ' + item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Estado de desinfeccion
                </label>
                <select value={statusDesinfectionSelect} onChange={(e) => setStatusDesinfectionSelect(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Seleccionar--</option>
                  {statusDesinfection?.data?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Comunal
                </label>
                <select value={typeCommunalSelect} onChange={(e) => setTypeCommunalSelect(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Seleccionar--</option>
                  {typeCommunal?.data?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.description}
                    </option>
                  ))}
                  </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Tipo de carga
                </label>
                <select value={typeBurdenSelect} onChange={(e) => setTypeBurdenSelect(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Seleccionar--</option>
                  {typeBurden?.data?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Tipo de insumo
                </label>
                <select value={typeInputSelect} onChange={(e) => setTypeInputSelect(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">--Seleccionar--</option>
                  {typeInput?.data?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Destino inicial
                </label>
                <input value={initialDestinationInput} onChange={(e) => setInitialDestinationInput(e.target.value)} placeholder="Inicio de recorrido" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                Destino final
                </label>
                <input value={endDestinationInput} onChange={(e) => setEndDestinationInput(e.target.value)} placeholder="Final del recorrido" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />
              </div>

              <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                Guardar
              </button>            
            </div>

          </div>
        </div>

    </>
  )
}

export default Create

