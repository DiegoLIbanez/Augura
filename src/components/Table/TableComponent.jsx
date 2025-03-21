import React, { useState } from "react";

//Components
// import Pagination from "../Pagination/Pagination";

function TableComponent({ setView, dataList, ...props }) {
  const { header, columns } = props;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataList.length / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataList.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1, 2];

    if (currentPage <= 2) {
      pages.push("...");
    } else if (currentPage > 2 && currentPage < totalPages - 1) {
      pages.push(currentPage);
      pages.push("...");
    } else {
      pages.push("...");
      pages.push(totalPages - 1);
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <>
      <div className="flex flex-col bg-clip-border bg-white h-full rounded-lg shadow-md text-gray-700 w-full overflow-scroll relative">
        <table className="table-auto text-left w-full min-w-max">
          <thead>
            <tr>
              {header.map((item, i) => (
                <th
                  key={i}
                  className="bg-gray-900 border-b border-slate-200 p-4"
                >
                  <p className="text-sm text-white font-normal leading-none">
                    {item.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(currentData ?? []).length === 0 ? (
              <tr>
                <td
                  colSpan="15"
                  className="p-4 text-center text-slate-500 text-sm"
                >
                  No hay registros
                </td>
              </tr>
            ) : (
              currentData.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200 hover:bg-slate-200"
                >
                  {columns.map((col, index) => (
                    <td key={index} className="p-4 py-2">
                      {col.render ? (
                        col.render(item)
                      ) : (
                        <p className="text-slate-500 text-sm">
                          {item[col.accessor] || "N/A"}
                        </p>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-between items-center px-4">
          <div className="text-gray-500 text-sm">
            Mostrando{" "}
            <b>
              {startIndex + 1}-{Math.min(endIndex, dataList.length)}
            </b>{" "}
            de {dataList.length}
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {generatePageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-1">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableComponent;

{
  /* <td className="p-4 py-2">
  <p className="text-slate-500 text-sm">
    {item.person[0].dni}
  </p>
</td>

<td className="p-4 py-2">
  <p className="text-slate-500 text-sm">
    {item.person[0].name}
  </p>
</td>  

<td className="p-4 py-2">
  <p className="text-slate-500 text-sm">
    {item.person[0].phoneNumber}
  </p>
</td>

<td className="p-4 py-2">
  <p className="text-slate-500 text-sm">
    {item.person[0].role.description}
  </p>
</td> */
}
