import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
//swicht alert
import Swal from "sweetalert2";

// redux
import { useDispatch, useSelector } from "react-redux";

//Slices
import { fetchtypeCommunal } from "../../../store/slice/typeCommunalSlice";
import { createWaterConsumption } from "../../../store/slice/waterConsumtionSlice";

const ConsumptionForm = ({ setView }) => {
  //Get info redux
  // const infoRole = useSelector((store) => store.auth.data.role);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    waterConsumption: "",
    disinfectantConsumption: "",
    typeCommunal: "",
  });

  const typeCommunal = useSelector((state) => state.typeCommunal.data);

  // limpiar el formulario
  const clearForm = () => {
    setFormData({
      waterConsumption: "",
      disinfectantConsumption: "",
      typeCommunal: "",
    });
  };

  //llamamos la api de typeCommunal
  useEffect(() => {
    dispatch(fetchtypeCommunal());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para guardar los datos
    const res = await createWaterConsumption(formData);

    switch (res.statusCode) {
      case 201:
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          showConfirmButton: false,
          timer: 1500,
        });
        clearForm();
        break;
      default:
        Swal.fire({
          icon: "error",
          title: "¡Error al registrar!",
          showConfirmButton: false,
          timer: 1500,
        });
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleBack = () => {
    setView({ list: true });
  };

  return (
    <>
      {/* {
        infoRole === 'Administrador' ? 
          <>
            <div className="container p-4 mx-auto">
              <button className="bg-blue-500 border-b-[4px] border-blue-600 rounded-lg text-white cursor-pointer hover:-translate-y-[1px] hover:brightness-110 px-6 py-2 transition-all" onClick={handleBack}>
                Volver
              </button>
            </div>
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
            Registro de Consumos
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de agua */}
            <div>
              <label
                htmlFor="agua"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Consumo de agua (litros)
              </label>
              <input
                type="number"
                id="waterConsumption"
                value={formData.waterConsumption}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
                placeholder="Ingrese el consumo de agua"
              />
            </div>

            {/* Campo de desinfectante */}
            <div>
              <label
                htmlFor="disinfectantConsumption"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Consumo de desinfectante (litros)
              </label>
              <input
                type="number"
                id="disinfectantConsumption"
                value={formData.disinfectantConsumption}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
                placeholder="Ingrese el consumo de desinfectante"
              />
            </div>

            {/* Selector de proceso */}
            <div>
              <label
                htmlFor="typeCommunal"
                className="text-gray-700 text-sm block font-medium mb-2"
              >
                Tipo de Comunal
              </label>
              <select
                id="typeCommunal"
                value={formData.typeCommunal}
                onChange={handleChange}
                required
                className="bg-white border border-gray-300 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 transition-all"
              >
                <option value="">Seleccione una opción</option>
                {typeCommunal?.data?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón de enviar */}
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
};

export default ConsumptionForm;
