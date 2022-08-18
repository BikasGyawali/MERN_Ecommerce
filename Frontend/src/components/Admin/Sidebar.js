import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="flex bg-gray-100 h-screen w-[16%] pt-6">
        <ul className="font-sans flex flex-col w-full">
          <NavLink to="/admin/dashboard">
            {" "}
            <li className="px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl ">
                <i className="fa-solid fa-address-card pr-2"></i>Dashboard
              </p>
            </li>
          </NavLink>
          <NavLink to="/admin/orders">
            {" "}
            <li className="px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl ">
                <i className="fa-solid fa-address-card pr-2"></i>Orders
              </p>
            </li>
          </NavLink>
          <NavLink to="/admin/products">
            <li className="px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl">
                <i className="fa-brands fa-product-hunt pr-2"></i>Products
              </p>
            </li>
          </NavLink>
          <NavLink to="/admin/users">
            <li className="px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl">
                <i className="fa-solid fa-users pr-2"></i>Users
              </p>
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
