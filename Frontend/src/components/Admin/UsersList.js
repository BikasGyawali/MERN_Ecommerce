import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getallUsers, clearErrors,deleteSingleUser } from "../../actions/userAction";
import Sidebar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Pagination from "../Pagination";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, users, isDeleted } = useSelector(
    (state) => state.allUsers
  );
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage*pageSize;
   const indexOfFirstPost=indexOfLastPost-pageSize;
   const currentPosts=users && users.slice(indexOfFirstPost,indexOfLastPost);

  useEffect(() => {
    dispatch(getallUsers());

    if (error) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      window.alert("User Deleted Successfully");
      navigate("admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const deleteUser = (id) => {
    dispatch(deleteSingleUser(id));
  };

  return (
    <>
      <div className="flex w-full ">
        <Sidebar />
        <div className="w-[80%]">
          {currentPosts && currentPosts.length >= 1 ? (
            <>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl md:text-2xl font-sans font-bold uppercase pb-4">
                  Users List
                </p>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[80%] lg:w-[60%] flex  bg-gray-100 justify-center items-center shadow rounded p-3 mb-4"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left font-sans  dark:text-gray-400">
                  <thead className="text-sm md:text-md lg:text-lg xl:text-xl  bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap ">
                        Id
                      </th>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap ">
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3   px-6  whitespace-nowrap"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3  px-6   whitespace-nowrap"
                      >
                        Role
                      </th>
                      <th scope="col" className="py-3  px-6  whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" font-sans font-[600]">
                    {currentPosts &&
                      currentPosts
                        .filter((val) => {
                          if (searchTerm === "") {
                            return val;
                          } else if (
                            val.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            val._id
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            val.email
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((value, index) => {
                          return (
                            <tr
                              className="text-sm md:text-md lg:text-lg xl:text-xl bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                              key={index}
                            >
                              <td className="py-3 px-6 whitespace-nowrap">
                                {value._id}
                              </td>
                              <td className="py-3 px-6 whitespace-nowrap">
                                {value.name}
                              </td>

                              <td className="py-3 px-6 whitespace-nowrap">
                                {value.email}
                              </td>
                              <td
                                className={
                                  value.role !== "user"
                                    ? "text-green-500 py-3 px-6 whitespace-nowrap"
                                    : "text-red-500 py-3 px-6 whitespace-nowrap"
                                }
                              >
                                {value.role}
                              </td>
                              <td className="flex py-3 px-6 whitespace-nowrap">
                                <Link to={`/admin/updateuser/${value._id}`}>
                                  <p className="text-2xl">
                                    <i className="fa-solid fa-edit"></i>
                                  </p>
                                </Link>
                                <button onClick={() => deleteUser(value._id)}>
                                  <p className="text-2xl">
                                    <i className="fa-solid fa-trash-can"></i>
                                  </p>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
                <Pagination totalPosts={users.length} pageSize={pageSize} paginate={paginate}/>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-screen font-sans font-bold text-2xl lg:text-4xl">
                No users at the moment
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
