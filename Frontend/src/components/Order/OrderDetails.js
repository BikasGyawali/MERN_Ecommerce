import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderAction";
import Img from "../../images/1.jpg";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const { orders } = useSelector((state) => state.orderDetails);

  return (
    <>
      <div className="flex flex-col bg-gray-50 w-full justify-center items-center py-10">
        <div className="flex   text-sm md:text-md lg:text-lg xl:text-xl flex-col w-full px-3 md:px-10 border-b-[1.5px] border-black font-bold pb-8 justify-center space-y-3">
          <h2 className="font-sans uppercase tracking-widest pb-4">
            Order Id: {orders && orders._id}
          </h2>
          <p className="flex  font-sans">
            Name:{" "}
            <span className="pl-1 font-medium">
              {orders && orders.user && orders.user.name}
            </span>
          </p>
          <p className="flex  font-sans">
            Phone No:
            <span className="pl-1 font-medium">
              {orders && orders.shippingInfo && orders.shippingInfo.phoneNo}
            </span>
          </p>
          <p className="flex  font-sans">
            Address:{" "}
            <span className="pl-1 font-medium">
              State {orders && orders.shippingInfo && orders.shippingInfo.state}
              , {orders && orders.shippingInfo && orders.shippingInfo.city},
              {orders && orders.shippingInfo && orders.shippingInfo.tole},
              Nearest Landmark (
              {orders &&
                orders.shippingInfo &&
                orders.shippingInfo.nearestLandmark}
              )
            </span>
          </p>
        </div>
        <div className="flex flex-row py-2 md:py-6  text-sm md:text-md lg:text-lg xl:text-xl justify-between w-full px-3 md:px-10 border-b-[1.5px] border-black  items-center  font-bold">
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
        </div>
        <div className="flex flex-col  text-sm md:text-md lg:text-lg xl:text-xl w-full px-3 justify-center items-start ">
          <h2 className="font-sans  tracking-widest pt-3  font-bold uppercase">
            Order Items
          </h2>
          <div className="flex  text-sm md:text-md lg:text-lg xl:text-xl flex-col w-full justify-start space-y-4  mb-4 mt-4 ">
            {orders &&
              orders.orderItems &&
              orders.orderItems.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex  w-full font-semibold flex-row items-center md:px-6 md:py-6 shadow bg-zinc-200   font-sans justify-between felx-wrap"
                    >
                      <div className="w-full md:w-[20%] flex justify-center items-center">
                        <img
                          src={item && `http://localhost:4000/` + item.image}
                          className="h-16 md:h-20"
                          alt={item.name}
                        />
                      </div>
                      <span className="w-full md:w-[20%] hidden md:flex justify-center items-center">
                        {item.name}
                      </span>
                      <span className="w-full md:w-[20%] flex justify-center items-center">
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

export default OrderDetails;
