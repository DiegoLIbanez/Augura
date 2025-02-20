import React,{ useState } from "react";

//Components
// import Pagination from "../Pagination/Pagination";

function TableComponent({ setView, ...props }) {

  const {
    dataList,
    header,
    columns
  } = props;

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = dataList.length > 0 ? Math.ceil(dataList.length / itemsPerPage) : 1;

  // Obtener los datos de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataList.slice(startIndex, endIndex);

  // Cambiar de página
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {header.map((item, i) => (
                <th key={i} className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-900">
                    {item.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(currentData ?? []).length === 0  ? (
              <tr>
                <td colSpan="15" className="text-center p-4 text-sm text-slate-500"> No hay registros</td>
              </tr>
            ) : (currentData.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-200 border-b border-slate-200">
                    {columns.map((col, index) => (
                      <td key={index} className="p-4 py-2 ">
                        {col.render ? col.render(item) : <p className="text-sm text-slate-500">{item[col.accessor] || "N/A"}</p>}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between items-center px-4">
            <div className="text-sm text-gray-500">
              Mostrando <b>{startIndex + 1}-{Math.min(endIndex, dataList.length)}</b> de {dataList.length}
            </div>
            <div className="flex space-x-2">
                {/* Botón Anterior */}
                <button className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  Prev
                </button>

                {/* Botones de página */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}onClick={() => goToPage(page)}>
                    {page}
                  </button>
                ))}

                {/* Botón Siguiente */}
                <button className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`} onClick={() => goToPage(currentPage + 1)}disabled={currentPage === totalPages}>
                  Next
                </button>
            </div>
          </div>
      </div>
    </>
  );
}

export default TableComponent;


{/* <td className="p-4 py-2 ">
  <p className="text-sm text-slate-500">
    {item.person[0].dni}
  </p>
</td>

<td className="p-4 py-2 ">
  <p className="text-sm text-slate-500">
    {item.person[0].name}
  </p>
</td>  

<td className="p-4 py-2 ">
  <p className="text-sm text-slate-500">
    {item.person[0].phoneNumber}
  </p>
</td>

<td className="p-4 py-2 ">
  <p className="text-sm text-slate-500">
    {item.person[0].role.description}
  </p>
</td> */}