import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  var moment = require("moment");
  const { loading, user } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <>LOADING ...</>
      ) : (
        <>
          {user && user.user ? (
            <>
              <div className="flex flex-col md:flex-row py-16  bg-gray-50 font-sans justify-center items-top ">
                <div className="flex flex-col  justify-center items-center">
                  <img
                    src={
                      user &&
                      user.user &&
                      `http://localhost:4000/` + user.user.image
                    }
                    className="h-44 w-44 shadow"
                    alt="/user"
                  />
                  <Link to="/updateprofile">
                    <button className="bg-blue-600 text-white my-6 tracking-wide uppercase w-60 px-4 shadow-md rounded py-3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl">
                      Edit Profile
                    </button>
                  </Link>
                </div>
                <div className="flex space-y-8  md:w-1/2 flex-col  justify-center items-center">
                  <div className="text-xl md:text-2xl flex space-x-2">
                    <p className="font-bold">Name:</p>
                    <p className="">{user.user.name}</p>
                  </div>
                  <div className=" text-xl md:text-2xl flex space-x-2">
                    <p className="font-bold">Email:</p>
                    <p className="">{user.user.email}</p>
                  </div>
                  <div className="text-xl md:text-2xl flex space-x-2">
                    <p className="font-bold">Joined On:</p>
                    <p className="">
                      {moment(user.user.register_date).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <Link to={`/changepassword/${user.user._id}`}>
                    <button className="bg-blue-600 tracking-wide uppercase w-72 text-white my-3 px-3 shadow-md rounded py-3 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl">
                      Change Password
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center bg-gray-100 items-center h-[80vh]">
                <p className="font-sans text-l md:text-2xl lg:text-4xl uppercase mb-8">
                  You Need To Be Signed In to View This Page
                </p>

                <Link to="/login">
                  <button className="bg-blue-600 hover:bg-blue-500 font-sans text-white tracking-widest uppercase py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl">
                    Log in
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
