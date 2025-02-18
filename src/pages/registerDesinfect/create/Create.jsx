import React,{ useEffect } from 'react';

//Redux
import { useSelector,useDispatch } from "react-redux";

//Slices
import { fetchstatusDesinfection } from "../../../store/slice/statusDesinfectionSlice";
import { fetchTypeBurden } from "../../../store/slice/typeBurdenSlice";
import { fetchtypeCommunal } from "../../../store/slice/typeCommunalSlice";
import { fetchtypeInput } from "../../../store/slice/typeInputSlice";

function Create({ setView }) {

  const infoRole = useSelector((store) => store.auth.data.role);

  const typeCommunal = useSelector((state) => state.typeCommunal.data);
  const typeBurden = useSelector((state) => state.typeBurden);
  const statusDesinfection = useSelector((state) => state.statusDesinfection);
  const typeInput = useSelector((state) => state.typeInput);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchstatusDesinfection())
    dispatch(fetchTypeBurden())
    dispatch(fetchtypeCommunal())
    dispatch(fetchtypeInput())
  }, [])

  useEffect(() => {
    console.log(typeCommunal);
    console.log(typeBurden);
    console.log(statusDesinfection);
    console.log(typeInput);    
  }, [])
  
  const handleSubmit = () => {}

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

      <form>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">

            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  vehiculo
              </label>
                <input placeholder="Vehiculo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />
                <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Conductor
              </label>
                <input placeholder="Conductor" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />
                <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Estado de desinfeccion
              </label>
               <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Comunal
              </label>
               <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Tipo de carga
              </label>
               <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Tipo de isumo
              </label>
               <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Destino inicial
                </label>
                <input placeholder="Inicio de recorrido" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                Destino final
                </label>
                <input placeholder="Final del recorrido" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" type="text" />
              </div>

              <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                Guardar
              </button>            
            </div>

          </div>
        </div>
      </form>
    </>
  )
}

export default Create

