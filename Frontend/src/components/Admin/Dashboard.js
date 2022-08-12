import React from "react";
import Sidebar from "../Admin/Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full flex flex-col justify-start items-center px-20 space-y-6">
          <div className="flex justify-center items-center text-3xl font-bold text-white rounded h-60 w-full bg-blue-500 shadow">
            Total Amount : $4550
          </div>
          <div className="flex justify-between flex-wrap space-x-12">
            <div className="flex justify-center items-center text-2xl px-6 font-bold text-white rounded h-60  bg-gray-500 shadow">
              Products: $6550
            </div>
            <div className="flex justify-center items-center  text-2xl px-6 font-bold text-white rounded h-60  bg-red-500 shadow">
              Total Amount : $6550
            </div>
            <div className="flex justify-center items-center text-2xl px-6 font-bold text-white rounded h-60 bg-green-500 shadow">
              Total Amount : $6550
            </div>
            <div className="flex justify-center items-center text-2xl px-6 font-bold text-white rounded h-60 bg-blue-500 shadow">
              Total Amount : $4550
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
