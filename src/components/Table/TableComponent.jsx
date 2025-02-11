import React from "react";

function TableComponent() {
  return (
    <div className="flex flex-col w-11/12 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-3 mt-1 pl-3">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex flex-col mb-3 sm:mb-0">
            <label
              htmlFor="project"
              className="text-sm font-medium text-slate-800 text-center"
            >
              Project
            </label>
            <select
              id="project"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Project 1</option>
              <option>Project 2</option>
              <option>Project 3</option>
            </select>
          </div>
          <div className="flex flex-col mb-3 sm:mb-0">
            <label
              htmlFor="project"
              className="text-sm font-medium text-slate-800 text-center"
            >
              Project
            </label>
            <select
              id="project"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Project 1</option>
              <option>Project 2</option>
              <option>Project 3</option>
            </select>
          </div>
          <div className="flex flex-col mb-3 sm:mb-0">
            <label
              htmlFor="project"
              className="text-sm font-medium text-slate-800 text-center"
            >
              Project
            </label>
            <select
              id="project"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Project 1</option>
              <option>Project 2</option>
              <option>Project 3</option>
            </select>
          </div>
          <div className="flex flex-col mb-3 sm:mb-0">
            <label
              htmlFor="project"
              className="text-sm font-medium text-slate-800 text-center"
            >
              Project
            </label>
            <select
              id="project"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Project 1</option>
              <option>Project 2</option>
              <option>Project 3</option>
            </select>
          </div>
          <div className="flex flex-col mb-3 sm:mb-0">
            <label
              htmlFor="status"
              className="text-sm font-medium text-slate-800 text-center"
            >
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Active</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        <div className="w-full max-w-sm min-w-[200px] relative mt-3 sm:mt-0 sm:ml-auto">
          <div className="relative">
            <input
              className=" w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for invoice..."
            />
            <button
              className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="w-8 h-8 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Invoice Number
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Customer
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Amount
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Issued
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Due Date
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1001
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">John Doe</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$1,200.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-01</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-15</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1002
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Jane Smith</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$850.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-05</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-20</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1003
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Acme Corp</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$2,500.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-07</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-21</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1004
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-10</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-25</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-slate-500">
            Showing <b>1-5</b> of 45
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              Prev
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
              1
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              2
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              3
            </button>
            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;
