import { useState, useEffect, useContext } from "react";

//ViewsContext
import { ViewsContext } from "../../context/ViewsContext";

//Redux
import { useSelector } from "react-redux";

//icons
import { FaUserCircle } from "react-icons/fa";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import { PiListChecksFill } from "react-icons/pi";

function Sidebar({ isOpen }) {
  //Manejo de las vistas
  const { setViews } = useContext(ViewsContext);
  const infoRole = useSelector((store) => store.auth.data.role);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (infoRole === "Administrador") {
      setMenu([
        {
          name: "Lista desinfeccion",
          icon: <PiListChecksFill />,
          function: () => setViews({ listDisinfect: true }),
        },
        {
          name: "Consumo de Agua",
          icon: <HiOutlineDocumentReport />,
          function: () => setViews({ waterConsumption: true }),
        },
        {
          name: "Reportes",
          icon: <HiDocumentReport />,
          function: () => setViews({ graph: true }),
        },
      ]);
    } else if (infoRole === "Usuario") {
      setMenu([
        {
          name: "Registrar desinfeccion",
          function: () => setViews({ registerDisinfect: true }),
        },
        {
          name: "Consumo de agua",
          function: () => setViews({ CreatewaterConsumption: true }),
        },
      ]);
    }
  }, []);

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menu.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.function} //Agregamos la función para cambiar la vista
                  className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className="ms-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
