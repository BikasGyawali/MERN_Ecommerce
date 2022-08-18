import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import _ from "lodash";
import { getAllOrders, deleteOrder } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const navigate = useNavigate();
  const pageSize = 1;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState();
  const dispatch = useDispatch();
  const { error, isDeleted, orders, clearErrors } = useSelector(
    (state) => state.allOrders
  );

  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      window.alert("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    setPaginatedPosts(_(orders).slice(0).take(pageSize).value());
  }, [dispatch, error, isDeleted, navigate]);

  const pageCount = orders ? Math.ceil(orders.length / pageSize) : 0;
  //if (pageCount === 1) return ;

  const pages = _.range(1, pageCount + 1);

  const pagination = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * pageSize;
    const paginatedPost = _(orders).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  };
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <table className="flex bg-gray-50 flex-col items-center py-12">
            <p className="text-2xl font-sans font-bold uppercase pb-8 ">
              All Orders{" "}
            </p>
            <input
              type="text"
              placeholder="Search"
              className="w-[60%] flex bg-gray-100 justify-center items-center shadow rounded p-3 my-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <thead className="w-[80%] border-[1.5px] border-b-0 border-black flex justify-between font-bold items-center py-3">
              <th className="flex w-[18%] justify-center items-center">
                 Id
              </th>
              <th className="flex w-[18%] justify-center items-center">No of Items</th>
              <th className="flex w-[18%] justify-center items-center">
                Amount
              </th>
              <th className="flex w-[18%] justify-center items-center">Status</th>
              <th className="flex w-[18%] justify-center items-center">
                Actions
              </th>
            </thead>

            <tbody className="w-[80%] font-sans font-[600] flex flex-col border-[1.5px] border-black py-3">
              {paginatedPosts &&
                paginatedPosts
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val._id.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((value, index) => {
                    return (
                      <tr
                        key={index}
                        className="flex justify-between items-center space-y-4"
                      >
                        <td className="flex w-[18%%] justify-center items-center">
                          {value._id}
                        </td>
                        <td className=" flex w-[18%] justify-center items-center">
                          {value.orderItems.length}
                        </td>

                        <td className=" flex w-[18%] justify-center items-center">
                          ${value.bill.allTotal}
                        </td>
                        <td className="flex w-[18%] justify-center items-center">
                          {value.orderStatus}
                        </td>
                        <td className="flex gap-x-2 w-[18%] justify-center items-center ">
                          <Link to={`/updateorder/${value._id}`}>
                            <p className="text-2xl">
                              <i className="fa-solid fa-edit"></i>
                            </p>
                          </Link>
                          <button onClick={() => deleteOrderHandler(value._id)}>
                            <p className="text-2xl">
                              <i className="fa-solid fa-trash-can"></i>
                            </p>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
            <nav className="pt-8 flex justify-center items-center">
              <ul className="flex text-xl space-x-4">
                {pages.map((page) => {
                  return (
                    <li
                      className={
                        page === currentPage
                          ? "bg-blue-500 px-2 rounded shadow hover:cursor-pointer"
                          : "bg-gray-50 hover:cursor-pointer"
                      }
                    >
                      <p onClick={() => pagination(page)}>{page}</p>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderList;
