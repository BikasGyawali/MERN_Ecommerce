import React, { useState } from "react";
import { Link } from "react-router-dom";
import Img from "../images/1.jpg";
import Imgone from "../images/2.jpg";
import Imgtwo from "../images/3.jpg";
import logo from "../images/logo.png";
import Search from "./Product/Search";
import "../App.css";
import { logout } from "../actions/userAction";

import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="navbar flex w-full items-center font-sans justify-between py-4 px-8 lg:px-20 bg-transparent relative">
        <a href="#" className="font-bold  tracking-wide font-sans">
          <img src={logo} className="h-8 w-10" alt="/logo" />
        </a>
        <div className="hidden flex-row gap-12 lg:flex md:flex">
          <div className="dropdown inline-block">
            <div>
              {" "}
              <a
                href="#"
                className="font-bold text-[16px] hover:border-b-2 hover:border-b-black"
              >
                Weights
              </a>
            </div>
            <div className="dropdownmenu absolute hidden left-0 right-0 pt-4">
              <div className=" flex w-[100%] bg-gray-300 min-h-80 mx-auto">
                <div className="grid grid-cols-4 mx-auto py-4">
                  <div className="flex flex-col ml-8 md:ml-10 lg:ml-12">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="flex flex-col ">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="mr-8 md:mr-10 lg:mr-12">
                    <img
                      src={Imgone}
                      className="h-52 w-52 md:h-64 md:w-64 "
                      alt="/hello"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown inline-block">
            <div>
              {" "}
              <a
                href="#"
                className="font-bold text-[16px] hover:border-b-2 hover:border-b-black"
              >
                Calisthenics
              </a>
            </div>
            <div className="dropdownmenu absolute hidden left-0 right-0 pt-4">
              <div className=" flex w-[100%] bg-gray-300 min-h-80 mx-auto">
                <div className="grid grid-cols-4 mx-auto gap-x-auto py-4">
                  <div className="flex flex-col ml-8 md:ml-10 lg:ml-12">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="mr-8 md:mr-10 lg:mr-12">
                    <img
                      src={Img}
                      className="h-52 w-52 md:h-64 md:w-64 "
                      alt="/hello"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown inline-block">
            <div>
              {" "}
              <a
                href="#"
                className="font-bold text-[16px] hover:border-b-2 hover:border-b-black"
              >
                CrossFit
              </a>
            </div>
            <div className="dropdownmenu absolute hidden left-0 right-0 pt-4">
              <div className=" flex w-[100%] bg-gray-300 min-h-80 ">
                <div className="grid grid-cols-4 mx-auto gap-x-auto py-4">
                  <div className="flex flex-col ml-8 md:ml-10 lg:ml-12">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-md pb-4">FEATURED</p>
                    <ul className="text-decoration-none">
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                      <li>Clothing</li>
                    </ul>
                  </div>
                  <div className="mr-8 md:mr-10 lg:mr-12">
                    <img
                      src={Imgtwo}
                      className="h-72 w-72 md:h-64 md:w-64"
                      alt="/hello"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Search />

        {user && user.token ? (
          <>
            {" "}
            <div className=" flex justify-center items-center">
              <Link to="/cart">
                <p className="text-2xl pr-3" alt="Add to cart">
                  <i className="fa-solid fa-cart-arrow-down"></i>(
                  {cartItems.length})
                </p>
              </Link>
              <div className="dropdown relative">
                <p className="flex justify-center items-center text-2xl bg-orange-400 h-12 w-12 rounded-full shadow-lg hover:cursor-pointer">
                  <img
                    src={
                      user &&
                      user.user &&
                      `http://localhost:4000/` + user.user.image
                    }
                    className="rounded-full shadow-lg"
                    alt="user"
                  />
                </p>

                <div className="dropdownmenu absolute hidden font-bold bg-white z-10 -left-12 top-12 w-40 px-auto pt-5 pb-8 shadow rounded">
                  <ul className="flex-col justify-center  px-12 items-center tracking-wide font-sans">
                    <li className="mb-3">
                      <Link
                        to="/profile"
                        className="font-base text-md font-sans tracking-wide hover:text-green-600"
                      >
                        Profile
                      </Link>
                    </li>
                    {user && user.user && user.user.role === "admin" ? (
                      <>
                        <li className="mb-3">
                          <Link
                            to="/admin/dashboard"
                            className="font-base text-md font-sans tracking-wide hover:text-green-600"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                    <li className="mb-6">
                      <Link
                        to="/order"
                        className="font-base text-md mt-4 font-sans tracking-wide hover:text-green-600"
                      >
                        Orders
                      </Link>
                    </li>
                    <li className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl">
                      <Link
                        to="/"
                        onClick={handleLogOut}
                        className="font-base text-md rounded text-white shadow-xl px-3 py-2 font-sans tracking-wide bg-red-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex md:flex  flex-row justify-evenly w-20">
            <Link to="/cart">
              <p className="text-2xl pr-1" alt="Add to cart">
                <i className="fa-solid fa-cart-arrow-down"></i>(
                {cartItems.length})
              </p>
            </Link>
            <Link to="/login">
              <p className="text-xl" alt="Add to cart">
                <i className="fa-solid fa-user"></i>
              </p>
            </Link>
          </div>
        )}
        <div className="md:hidden lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="-mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <p className="text-xl">
              <i className="fa-solid fa-bars"></i>
            </p>
          </button>
          {isMenuOpen && (
            <div className="absolute flex flex-col z-10 bg-white top-0 right-0 w-full">
              <div className="flex justify-between items-center py-4 px-8">
                <a href="#" className="font-bold tracking-wide font-sans">
                  <img src={logo} className="h-8 w-10 " alt="/logo" />
                </a>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className=" flex transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50  focus:bg-gray-200  focus:shadow-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <p className="text-2xl">
                    <i className="fa-solid fa-xmark"></i>
                  </p>
                </button>
              </div>
              <div className="flex flex-col justify-start shadow rounded  bg-gray-50 px-4 mx-8 py-4 mb-4 space-y-2">
                <ul className="">
                  <li>
                    <a className="font-bold font-sans text-xl">Weights</a>
                  </li>
                  <li>
                    <a className="font-bold font-sans text-xl">Calisthenics</a>
                  </li>
                  <li>
                    <a className="font-bold font-sans text-xl">CrossFit</a>
                  </li>
                  <li>
                    <a className="font-bold font-sans text-xl">Weights</a>
                  </li>
                  <li>
                    <a className="font-bold font-sans text-xl">Weights</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
