import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { saveShippingInfo } from "../../actions/cartAction";
//payment

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  console.log(user);

  const bill = {
    itemsPrice: orderInfo.itemsPrice,
    deliveryCharge: orderInfo.deliveryCharge,
    tax: orderInfo.tax,
    allTotal: orderInfo.allTotal,
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
    bill,
  };

  if (user && user.user) {
    console.log("hello");
    order.user = user.user._id;
  }

  const paymentData = {
    amount: orderInfo.allTotal * 100,
  };

  useEffect(() => {}, [dispatch, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    try {
      res = await axios.post(
        "http://localhost:4000/api/payment/processstripe",
        paymentData
      );
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        window.alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          localStorage.removeItem("cartItems");
          navigate("/success");
         
        } else {
          window.alert(
            "There is some issue while processing payment. Try after few minutes"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <PaymentElement /> */}
      <div className="flex pt-12 pb-24 login flex-col bg-gray-100  font-bold rounded px-auto justify-center items-center">
        <div className="shadow-lg rounded w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
          <p className="font-sans mb-6 font-bold text-red-500 text-2xl">
            Card Details
          </p>
          <div className="px-8 pt-6 pb-8 h-400 w-96 flex flex-col justify-center items-center">
            <form>
              <div className="mb-4  flex flex-col justify-start">
                <label className="font-sans text-sm uppercase">
                  Card Number
                </label>
                <CardNumberElement
                  className="mt-2 font-jakarta border h-12 py-2 px-3  w-80 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
              <div className="mb-4 flex flex-col justify-start">
                <label className="font-sans text-sm uppercase">
                  Card Expiry
                </label>
                <CardExpiryElement
                  className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
              <div className="mb-4 flex flex-col justify-start">
                <label className="font-sans text-sm  uppercase">Card CVC</label>
                <CardCvcElement
                  className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                  onClick={handleSubmit}
                >
                  Pay - {orderInfo && orderInfo.allTotal}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
