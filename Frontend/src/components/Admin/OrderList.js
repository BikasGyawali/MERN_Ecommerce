import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import { getAllOrders, deleteOrder } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Pagination from "../Pagination";

const OrderList = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
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
  }, [dispatch, error, isDeleted, navigate]);

  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = orders && orders.length && orders.slice(indexOfFirstPost, indexOfLastPost);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const paginate = (page) => {
    setCurrentPage(page);
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
                  Orders List
                </p>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[80%] lg:w-[60%] flex  bg-gray-100 justify-center items-center shadow rounded p-3 mb-4"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div class="overflow-x-auto relative">
                <table class="w-full text-sm text-left font-sans  dark:text-gray-400">
                  <thead class="text-sm md:text-md lg:text-lg xl:text-xl  bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap ">
                        Id
                      </th>
                      <th
                        scope="col"
                        className="py-3   px-6  whitespace-nowrap"
                      >
                        No of Items
                      </th>
                      <th
                        scope="col"
                        className="py-3  px-6   whitespace-nowrap"
                      >
                        Amount
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
                            val._id
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
                                {value.orderItems.length}
                              </td>
                              <td className="py-3 px-6 whitespace-nowrap">
                                ${value.bill.allTotal}
                              </td>
                              <td className="flex py-3 px-6 whitespace-nowrap">
                                <Link to={`/updateorder/${value._id}`}>
                                  <p className="text-2xl">
                                    <i className="fa-solid fa-edit"></i>
                                  </p>
                                </Link>
                                <button
                                  onClick={() => deleteOrderHandler(value._id)}
                                >
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
                <Pagination
                  totalPosts={orders.length}
                  pageSize={pageSize}
                  paginate={paginate}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-screen font-sans font-bold text-2xl lg:text-4xl">
                No Orders at the moment
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;
