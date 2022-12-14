import React, { useEffect } from "react";
import Sidebar from "../Admin/Sidebar";
import { getAllOrders } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductsAdmin } from "../../actions/productAction";
import { getallUsers } from "../../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, totalAmount } = useSelector((state) => state.allOrders);
  const { products, error } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors);
    }
    dispatch(getProductsAdmin);
    dispatch(getAllOrders);
    dispatch(getallUsers);
  }, [dispatch, error]);

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full flex flex-col justify-start items-center space-y-4 px-6">
          <div className="flex justify-center items-center text-sm md:text-md lg:text-lg xl:text-xl font-bold text-white rounded h-32 md:h-60 w-full bg-blue-500 shadow">
            Total Amount : ${totalAmount && totalAmount ? totalAmount : 0}
          </div>
          <div className="flex justify-between space-x-4 w-full">
            <div className="flex justify-center items-center w-full text-sm md:text-md lg:text-lg xl:text-xl px-2 md:px-8 font-bold text-white rounded  h-28  md:h-60  bg-gray-500 shadow">
              Products: {products && products ? products.length : 0}
            </div>
            <div className="flex justify-center items-center w-full  text-sm md:text-md lg:text-lg xl:text-xl px-2 md:px-8 font-bold text-white rounded  h-28 md:h-60  bg-red-500 shadow">
              Orders: {orders && orders.length ? orders.length : 0}
            </div>
            <div className="flex justify-center items-center w-full text-sm md:text-md lg:text-lg xl:text-xl px-2 md:px-8 font-bold text-white rounded  h-28  md:h-60 bg-green-500 shadow">
              Users: {users && users.length ? users.length : 0}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
