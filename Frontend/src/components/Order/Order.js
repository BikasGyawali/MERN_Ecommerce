import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderAction";
const Order = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      {orders && orders.length ? (
        <>
          <table className="flex text-sm md:text-md lg:text-lg xl:text-xl bg-gray-100 flex-col justify-top items-center py-12">
            <p className=" font-sans font-bold uppercase pb-8 ">My orders</p>
            <thead className="w-[98%] border-[1.5px] border-b-0 border-black flex justify-between font-bold items-center py-3">
              <th className="hidden md:flex w-[18%] justify-center items-center">
                Order ID
              </th>
              <th className="flex w-[18%] justify-center items-center">
                No of Items
              </th>
              <th className="flex w-[18%] justify-center items-center">
                Amount
              </th>
              <th className="flex w-[18%] justify-center items-center">
                Status
              </th>
              <th className="flex w-[18%] justify-center items-center">
                Actions
              </th>
            </thead>

            <tbody className="w-[98%] font-sans font-[600] flex flex-col border-[1.5px] border-black py-3">
              {orders &&
                orders.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex justify-between items-center space-y-4"
                    >
                      <td className=" hidden md:flex w-[18%] justify-center items-center">
                        {value._id}
                      </td>
                      <td className="flex w-[18%] justify-center items-center">
                        {value.orderItems.length}
                      </td>

                      <td className="flex w-[18%] justify-center items-center">
                        ${value.bill.allTotal}
                      </td>
                      <td
                        className={
                          value.orderStatus !== "Processing"
                            ? "text-green-500 flex w-[18%] justify-center items-center"
                            : "text-red-500 flex w-[18%] justify-center items-center"
                        }
                      >
                        {value.orderStatus}
                      </td>
                      <td className="flex w-[18%] justify-center items-center ">
                        <Link to={`/orderdetails/${value._id}`}>
                          <p className="text-2xl">
                            <i class="fa-solid fa-eye"></i>
                          </p>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center font-sans font-bold text-2xl lg:text-4xl">
            You Haven't Ordered Any Items Yet!!!
          </div>
        </>
      )}
    </>
  );
};

export default Order;
