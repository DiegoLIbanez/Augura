import { useState, useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Slice
import { setView } from "../../store/slice/viewSlice";

//icons
// import { FaUserCircle } from "react-icons/fa";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import { PiListChecksFill } from "react-icons/pi";

function Sidebar({ isOpen }) {
  const dispatch = useDispatch();
  const infoRole = useSelector((store) => store.auth.role);
  const [menu, setMenu] = useState([]);

  const handleViewChange = (viewName) => {
    dispatch(setView(viewName)); 
  };

  useEffect(() => {
    // console.log(infoRole);
    if (infoRole === "Administrador") {
      setMenu([
        { name: "Lista desinfección", icon: <PiListChecksFill />, function: () => handleViewChange("listDisinfect") },
        { name: "Consumo de Agua", icon: <HiOutlineDocumentReport />, function: () => handleViewChange("waterConsumption") },
        { name: "Reportes", icon: <HiDocumentReport />, function: () => handleViewChange("graph") }
      ]);
    } else if (infoRole === "Operador de Desinfección") {
      setMenu([
        { name: "Registrar desinfección", function: () => handleViewChange("registerDisinfect") },
        { name: "Consumo de agua", function: () => handleViewChange("createwaterConsumption") },
      ]);
    }
  }, [infoRole]);

  return (
    <>
      <aside
        id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${ isOpen ? "translate-x-0" : "-translate-x-full" } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menu.map((item, index) => (
              <li key={index}>
                <button onClick={item.function} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
