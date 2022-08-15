import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import _ from "lodash";
import { getAllOrders } from "../../actions/orderAction";
import { getOrderDetails, updateOrder } from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated } = useSelector((state) => state.updateOrder);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    dispatch(getAllOrders());
    if (isUpdated) {
      window.alert("Order updated Succesfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, id, error, navigate]);

  const { orders } = useSelector((state) => state.orderDetails);

  const [status, setStatus]=useState('');

  const handleUpdate = () => {
    dispatch(updateOrder(id, status));
  };
  return (
    <>
      <div className="flex flex-col bg-gray-50 px-8 justify-center items-center py-10">
        <div className="flex  text-l justify-between flex-col md:flex-row w-[70%] border-b-[1.5px] border-black font-bold pb-8 space-y-3">
          <div className="flex flex-col">
            <h2 className="font-sans uppercase tracking-widest pb-4">
              Order Id: {orders && orders._id}
            </h2>
            <h2 className="font-sans uppercase tracking-widest pb-2">
              Shipping Info:
            </h2>
            <p className="flex text-xl font-sans">
              Name:{" "}
              <span className="pl-1 font-medium">
                {orders && orders.user && orders.user.name}
              </span>
            </p>
            <p className="flex text-xl font-sans">
              Phone Number:
              <span className="pl-1 font-medium">
                {orders && orders.shippingInfo && orders.shippingInfo.phoneNo}
              </span>
            </p>
            <p className="flex text-xl font-sans">
              Address :{" "}
              <span className="pl-1 font-medium">
                State{" "}
                {orders && orders.shippingInfo && orders.shippingInfo.state},{" "}
                {orders && orders.shippingInfo && orders.shippingInfo.city},
                {orders && orders.shippingInfo && orders.shippingInfo.tole},
                Nearest Landmark (
                {orders &&
                  orders.shippingInfo &&
                  orders.shippingInfo.nearestLandmark}
                )
              </span>
            </p>
          </div>
          <div className="flex flex-col form w-[20%] space-y-3">
            <p className="font-sans font-semibold text-l">Status</p>
            <select name="status"
            value={status}
            className="p-2 bg-gray-100 border-[1.5px] border-black"
            onChange={(e)=>setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select> 
            <button onClick={handleUpdate} className="font-sans bg-blue-500 px-3 py-2 font-semibold text-l text-white rounded shadow">Update Status</button>
          </div>
        </div>
        <div className="flex py-6 text-xl justify-center w-[70%] border-b-[1.5px] border-black space-x-20 items-center  font-bold">
          <p className="flex font-sans">
            Amount:
            <span className="pl-1 font-bold text-green-500">
              ${orders && orders.bill && orders.bill.allTotal}
            </span>
          </p>
          <p className="flex font-sans">
            Order Status:
            <span className="pl-1 text-red-500">
              {orders && orders.orderStatus}
            </span>
          </p>
          <p className="flex font-sans">
            Payment:
            <span className="pl-1">Paid</span>
          </p>
          <p className="flex font-sans">
            Stripe ID:
            <span className="pl-1">
              {orders && orders.paymentInfo && orders.paymentInfo.id}
            </span>
          </p>
        </div>

        <div className="flex flex-col w-[60%] justify-center items-start px-8 ">
          <h2 className="font-sans text-xl tracking-widest pt-3  font-bold uppercase">
            Order Items
          </h2>
          <div className="flex flex-col w-full justify-start space-y-4  mb-4 mt-4 ">
            {orders &&
              orders.orderItems &&
              orders.orderItems.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex text-xl w-full font-semibold flex-col md:flex-row items-center md:px-6 md:py-6 shadow bg-zinc-200   font-sans justify-between felx-wrap"
                    >
                      <div className="w-ful md:w-[20%] flex justify-center items-center">
                        <img
                          src={item.image}
                          className="h-20"
                          alt={item.name}
                        />
                      </div>
                      <span className="w-ful md:w-[20%] flex justify-center items-center">
                        {item.name}
                      </span>
                      <span className="w-fullmd:w-[20%] flex justify-center items-center">
                        ${item.price}
                      </span>
                      <span className="w-full md:w-[20%] flex justify-center items-center">
                        {item.quantity}*${item.price}=$
                        {item.quantity * item.price}
                      </span>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
