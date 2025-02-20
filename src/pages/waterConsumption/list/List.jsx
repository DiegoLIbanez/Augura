import React, { useState } from "react";
import Create from "../create/Create";

const List = () => {
  const [view, setView] = useState({
    list: true,
    create: false,
    update: false,
    detail: false,
  });

  const handlerCreate = () => {
    setView({
      create: true,
    });
  };

  return (
    <>
      {view.list === true ? (
        <>
          <div className="container mx-auto p-4">
            <button
              className=" cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]"
              onClick={handlerCreate}
            >
              Crear Registro
            </button>
          </div>
          <div className="flex-grow flex justify-center">
            {/* <TableComponent setView={setView} /> */}
          </div>
        </>
      ) : view.create === true ? (
        <Create setView={setView} />
      ) : view.detail === true ? (
        // <DetailDesinfection setView={setView} />
        <></>
      ) : (
        <></>
      )}
    </>
  );
};

export default List;
