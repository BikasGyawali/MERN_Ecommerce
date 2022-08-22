import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails, clearErrors } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity > stock) return;
    dispatch(addItemToCart(id, newQuantity));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) return;
    dispatch(addItemToCart(id, newQuantity));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div>
      {cartItems && cartItems.length === 0 ? (
        <>
          <h2 className="flex justify-center items-center bg-gray-100 font-bold uppercase h-[70vh]">
            You have no items added to cart
          </h2>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full bg-gray-100 justify-center items-center py-6 md:py-10 px-6 md:px-12">
            <h2 className="font-sans text-sm md:text-xl lg:text-2xl tracking-wider pb-4 font-bold uppercase">
              You Have {cartItems.length} items in your cart
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center w-full space-x-6">
              <div className="flex flex-col w-full  md:w-[80%] md:bg-orange-500 md:px-12 justify-center  space-y-4 py-4 md:py-12 mb-4 items-center ">
                {cartItems.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex text-sm md:text-md lg:text-lg xl:text-xl w-full font-bold flex-row items-center md:px-6 md:py-6 shadow-xl rounded bg-gray-50  font-sans justify-center"
                      >
                        <div className="w-full md:w-[20%] h-24  flex justify-center items-center">
                          <img
                            src={`http://localhost:4000/` + item.image}
                            className="h-20"
                            alt={item.name}
                          />
                        </div>
                        <span className="w-full hidden md:pl-2 md:w-[20%] md:flex justify-center items-center">
                          {item.name}
                        </span>
                        <span className="w-full md:w-[20%] flex justify-center items-center">
                          ${item.price}
                        </span>
                        <div className="flex justify-center w-full md:w-[20%] items-center space-x-1">
                          <button
                            className="bg-red-500 p-1 flex justify-center items-center h-6 w-6 md:h-8 md:w-8 text-sm rounded shadow-sm"
                            onClick={() =>
                              decreaseQuantity(item.productId, item.quantity)
                            }
                          >
                            -
                          </button>
                          <span className="">{item.quantity}</span>
                          <button
                            className="bg-blue-500 flex justify-center items-center p-1 h-6 w-6 md:h-8 md:w-8 text-lg rounded shadow-sm "
                            onClick={() =>
                              increaseQuantity(
                                item.productId,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => deleteCartItem(item.productId)}
                          className="flex justify-center items-center w-full md:w-[20%]"
                        >
                          <p className="text-xl flex pb-1 md:pb-0 text-red-500">
                            <i className="fa-solid fa-trash"></i>
                          </p>
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="flex flex-col bg-white justify-center items-center  text-sm md:text-md lg:text-lg xl:text-xl font-sans space-y-3 shadow py-10 px-8">
                <p className=" font-bold pb-10">ORDER SUMMARY</p>
                <p className="font-bold">
                  No of Units:{" "}
                  {cartItems.reduce((acc, item) => (acc += item.quantity), 0)}
                </p>
                <p className=" font-bold">
                  Estimated Total: $
                  {cartItems.reduce(
                    (acc, item) =>
                      (acc += Number(item.quantity) * Number(item.price)),
                    0
                  )}
                </p>
                <button
                  className="px-3 py-2 w-44 text-white font-bold rounded-full tracking-widest uppercase bg-blue-500 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 hover:shadow-2xl"
                  onClick={checkOutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
