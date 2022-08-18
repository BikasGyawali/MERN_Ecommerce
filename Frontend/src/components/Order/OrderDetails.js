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
      <div className="flex flex-col bg-gray-50 px-8 justify-center items-center py-10">
        <div className="flex  text-l flex-col w-[60%] border-b-[1.5px] border-black font-bold pb-8 justify-center space-y-3">
          <h2 className="font-sans uppercase tracking-widest pb-4">
            Order Id: {orders && orders._id}
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
        <div className="flex py-6 text-xl justify-center w-[60%] border-b-[1.5px] border-black space-x-20 items-center  font-bold">
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
                        <img src={Img} className="h-20" alt={item.name} />
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

export default OrderDetails;
