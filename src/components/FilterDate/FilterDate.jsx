import React from "react";
import Swal from "sweetalert2";

const FilterDate = ({ setStartDate, endDate, setEndDate, startDate }) => {
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "La fecha inicial no puede ser mayor a la fecha final",
    });
  }

  return (
    <div className="flex flex-col md:flex-row lg:w-1/2 md:w-full gap-6 p-4">
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-slate-800">
          Fecha Inicial
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-slate-800">
          Fecha Final
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col justify-end">
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="h-[42px] px-4 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          Limpiar fechas
        </button>
      </div>
    </div>
  );
};

export default FilterDate;
