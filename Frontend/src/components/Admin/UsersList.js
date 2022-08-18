import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getallUsers, clearErrors } from "../../actions/userAction";
import Sidebar from "./Sidebar";

const UsersList = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getallUsers());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, loading]);

  const deleteUser=(id)=>{
    //todo:delete user
  }
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <table className="flex flex-col justify-top items-center py-12">
            <p className="text-2xl font-sans font-bold uppercase pb-8 ">
              Users List
            </p>
            <thead className="w-[80%] border-[1.5px] border-b-0 border-black flex justify-between font-bold items-center py-3">
              <th className="flex w-[18%] justify-center items-center">
                User Id
              </th>
              <th className="flex w-[18%] justify-center items-center">Name</th>
              <th className="flex w-[18%] justify-center items-center">
                Email
              </th>
              <th className="flex w-[18%] justify-center items-center">Role</th>
              <th className="flex w-[18%] justify-center items-center">
                Actions
              </th>
            </thead>

            <tbody className="w-[80%] font-sans font-[600] flex flex-col border-[1.5px] border-black py-3">
              {users &&
                users.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex justify-between items-center space-y-4"
                    >
                      <td className=" flex w-[18%] justify-center items-center">
                        {value._id}
                      </td>
                      <td className="flex w-[18%] justify-center items-center">
                        {value.name}
                      </td>

                      <td className="flex w-[18%] justify-center items-center">
                        {value.email}
                      </td>
                      <td
                        className={
                          value.role !== "user"
                            ? "text-green-500 flex w-[18%] justify-center items-center"
                            : "text-red-500 flex w-[18%] justify-center items-center"
                        }
                      >
                        {value.role}
                      </td>
                      <td className="flex w-[18%] gap-x-2 justify-center items-center ">
                        <Link to={`/admin/updateuser/${value._id}`}>
                        <p className="text-2xl">
                              <i className="fa-solid fa-edit"></i>
                            </p>
                        </Link>
                          <button onClick={()=>deleteUser(value._id)}>
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
        </div>
      </div>
    </>
  );
};

export default UsersList;
