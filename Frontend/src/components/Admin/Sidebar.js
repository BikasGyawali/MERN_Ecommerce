import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <div className="flex bg-gray-100 h-screen w-[16%] pt-6">
        <ul className="font-sans flex flex-col w-full">
          <NavLink to="/admin/orders">
            {" "}
            <li className="flex  items-center px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl ">
                <i className="fa-solid fa-address-card pr-2"></i>
              </p>
              <p className="hidden font-semibold md:flex font-sans">Orders</p>
            </li>
          </NavLink>
          <li className="  px-4 w-full hover:bg-gray-200 py-2">
            <div className="flex items-center">
              <p className="text-2xl">
                <i className="fa-brands fa-product-hunt pr-2"></i>
              </p>
              <p className="hidden font-semibold md:flex font-sans">Products</p>
              <p
                className="pl-0 md:pl-4 flex justify-end text-sm md:text-l"
                onClick={handleClick}
              >
                <i className="fa-solid fa-chevron-down"></i>
              </p>
            </div>

            {isOpen && (
              <div className="flex flex-col space-y-2 py-2 pl-2 md:pl-10 ">
                <NavLink to="/admin/addProduct">
                  <div className="flex items-center">
                    <p className="text-xl">
                      <i className="fa-brands fa-plus pr-2"></i>
                    </p>
                    <p className="hidden font-semibold md:flex font-sans">
                      Add
                    </p>{" "}
                  </div>{" "}
                </NavLink>
                <NavLink to="/admin/products">
                  <div className="flex items-center">
                    <p className="text-l">
                      <i className="fa-solid fa-eye pr-2"></i>
                    </p>
                    <p className="hidden font-semibold md:flex font-sans">
                      View
                    </p>
                  </div>
                </NavLink>
              </div>
            )}
          </li>
          <NavLink to="/admin/users">
            <li className="flex  items-center px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl">
                <i className="fa-solid fa-users pr-2"></i>
              </p>
              <p className="hidden font-semibold md:flex font-sans">Users</p>
            </li>
          </NavLink>
          <NavLink to="/admin/dashboard">
            {" "}
            <li className="flex  items-center px-4 w-full hover:bg-gray-200 py-2">
              <p className="text-2xl ">
                <i className="fa-solid fa-address-card pr-2"></i>
              </p>
              <p className="hidden font-semibold md:flex font-sans">
                Dashboard
              </p>
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
