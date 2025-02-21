import React, { useState, useEffect } from "react";

//swicht alert
import Swal from "sweetalert2";

// redux
import { useDispatch, useSelector } from "react-redux";

//Slices
import { fetchtypeCommunal } from "../../../store/slice/typeCommunalSlice";
import { createWaterConsumption } from "../../../store/slice/waterConsumtionSlice";

const ConsumptionForm = ({ setView }) => {

  //Get info redux
  const infoRole = useSelector((store) => store.auth.data.role);

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
    setFormData({ ...formData,[e.target.id]: e.target.value});
  };

  const handleBack = () => {
    setView({ list: true });
  };

  return (
    <>

      {
        infoRole === 'Administrador' ? 
          <>
            <div className="container mx-auto p-4">
              <button className=" cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]" onClick={handleBack}>
                Volver
              </button>
            </div>
          </> : 
        <></>
      }

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Registro de Consumos
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de agua */}
            <div>
              <label
                htmlFor="agua"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Consumo de agua (litros)
              </label>
              <input
                type="number"
                id="waterConsumption"
                value={formData.waterConsumption}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Ingrese el consumo de agua"
              />
            </div>

            {/* Campo de desinfectante */}
            <div>
              <label
                htmlFor="disinfectantConsumption"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Consumo de desinfectante (litros)
              </label>
              <input
                type="number"
                id="disinfectantConsumption"
                value={formData.disinfectantConsumption}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Ingrese el consumo de desinfectante"
              />
            </div>

            {/* Selector de proceso */}
            <div>
              <label
                htmlFor="typeCommunal"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tipo de Comunal
              </label>
              <select
                id="typeCommunal"
                value={formData.typeCommunal}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConsumptionForm;
