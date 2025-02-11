import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TableComponent from "../../components/Table/TableComponent";

function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container sm:px-6 lg:px-8 py-20">
        <div className="flex-grow flex justify-center">
          <TableComponent />
        </div>
      </div>
    </div>
  );
}

export default Index;
