import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = cartItems.reduce(
    (acc, item) => (acc += Number(item.quantity) * Number(item.price)),
    0
  );
  const deliveryCharge = subTotal > 500 ? 0 : 20;
  const tax = 0.01 * subTotal;
  const allTotal = subTotal + tax + deliveryCharge;

  const handleClick = () => {
    const data = {
      itemsPrice: subTotal,
      deliveryCharge,
      tax,
      allTotal,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 justify-center items-center py-4  md:py-12 px-8 md:gap-x-10">
        <div className="flex flex-col bg-gray-50 px-8 justify-center items-center">
          <div className=" text-sm md:text-md lg:text-lg xl:text-xl flex flex-col border-b-[1.5px] border-black font-bold py-4 justify-center">
            <h2 className=" pb-3 font-sans uppercase tracking-widest">
              shipping Information
            </h2>
            <p className="  font-sans">
              Name:{" "}
              <span className="pl-1 font-medium">
                {user && user.user && user.user.name}
              </span>
            </p>
            <p className="  font-sans">
              Phone No:
              <span className="pl-1 font-medium">{shippingInfo.phoneNo}</span>
            </p>
            <p className=" font-sans ">
              Address: {" "}
              <span className="pl-1 font-medium">
                State {shippingInfo.state}, {shippingInfo.city},
                {shippingInfo.tole}, Nearest Landmark (
                {shippingInfo.nearestLandmark})
              </span>
            </p>
          </div>
          <div className="flex  text-sm md:text-md lg:text-lg xl:text-xl flex-col w-full justify-center items-start px-1 md:px-8">
            <h2 className="font-sans  tracking-widest pt-3  font-bold uppercase">
              Cart Items
            </h2>

            <div className="flex flex-col w-full justify-center items-center space-y-4  mb-4 mt-4 ">
              {cartItems &&
                cartItems.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex  text-sm md:text-md lg:text-lg xl:text-xl  w-full font-semibold flex-row justify-between items-center px-6 py-6 shadow bg-zinc-200 font-sans"
                      >
                        <div className="w-full md:w-[20%] flex justify-center items-center">
                          <img
                            src={`http://localhost:4000/` + item.image}
                            className="h-16 md:h-20"
                            alt={item.name}
                          />
                        </div>
                        <span className="w-full hidden md:flex md:w-[20%] justify-center items-center">
                          {item.name}
                        </span>
                        <span className="w-full flex md:w-[20%] justify-center items-center">
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
        <div className="flex flex-col bg-white  text-sm md:text-md lg:text-lg xl:text-xl justify-center items-center space-y-3  shadow  py-6 md:py-10 mt-6 px-6 md:px-12">
          <p className=" font-sans font-semibold pb-6">BILL SUMMARY</p>
          <p className=" font-sans font-semibold">
            Sub Total: ${subTotal}
          </p>
          <p className=" font-sans font-semibold">
            Delivery Charge: ${deliveryCharge}
          </p>
          <p className=" font-sans font-semibold">Tax: ${tax} (1%)</p>

          <p className=" font-sans font-semibold">
            All Total: ${allTotal}
          </p>
          <button
            className="px-3 py-2 w-44 text-white font-semibold rounded-full bg-blue-500 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 hover:shadow-2xl"
            onClick={handleClick}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
