import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import ProductDetails from "./components/Product/ProductDetails";
import ProductPage from "./components/Product/ProductPage";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store";
import { verifyUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import ChangePassword from "./components/User/ChangePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import axios from "axios";

//payment
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Order from "./components/Order/Order";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import CreateProduct from "./components/Admin/CreateProduct";

function App() {
  const [stripeAPIkey, setStripeAPIkey] = useState("");

  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(verifyUser());

    async function getStripeApikey() {
      const { data } = await axios.get(
        "http://localhost:4000/api/payment/getstripeapi"
      );

      setStripeAPIkey(data.stripeAPIkey);
    }
    getStripeApikey();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex h-screen text-5xl justify-center items-center">
            LOADING...
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Hero />} />
            <Route path="/product/:id" exact element={<ProductDetails />} />
            <Route path="/products/:keyword" exact element={<ProductPage />} />
            <Route path="/products" exact element={<ProductPage />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/updateprofile" exact element={<UpdateProfile />} />
            <Route
              path="/changepassword/:id"
              exact
              element={<ChangePassword />}
            />
            <Route path="/forgotpassword" exact element={<ForgotPassword />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/shipping" exact element={<Shipping />} />
            <Route path="/confirm" exact element={<ConfirmOrder />} />{" "}
            <Route
              path="/payment"
              exact
              element={
                stripeAPIkey && (
                  <Elements stripe={loadStripe(stripeAPIkey)}>
                    <Payment />
                  </Elements>
                )
              }
            />
            <Route path="/order" exact element={<Order />} />
            <Route path="/orderdetails/:id" exact element={<OrderDetails/>} />
            <Route path="/admin/dashboard" exact element={<Dashboard/>}/>
            <Route path="/admin/products" exact element={<ProductList/>}/>
            <Route path="/admin/addProduct" exact element={<CreateProduct/>}/>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
