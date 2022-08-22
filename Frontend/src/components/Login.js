import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { login, clearErrors } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";

import Passwordshowhide from "./Passwordshowhide";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (user && user.err) {
      window.alert(user.err);
    }
    if (user && user.token) {
      navigate(`/${redirect}`);
    }
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, user]);

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <>
      <div className="flex py-8 md:py-12 login flex-col bg-gray-100 font-bold rounded px-auto justify-center items-center">
        <div className="shadow-lg rounded w-[90%] md:w-[60%] lg:w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
          <p className="font-sans mb-6 font-bold text-red-500 text-xl md:text-2xl">
            LOG IN
          </p>
          <Formik
            enableReinitialize
            initialValues={{ email: "", password: "" }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .required("Please enter your email address"),
              password: yup
                .string()
                .required("Please enter password")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
            })}
            onSubmit={handleSubmit}
          >
            <>
              <Form>
                <div className="px-8 pt-6 pb-8 h-400 w-96 flex flex-col justify-center items-center">
                  <div className="mb-4  flex flex-col justify-start">
                    <label
                      htmlFor="email"
                      className="font-sans text-sm  uppercase"
                    >
                      Email
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <p className="text-red-500 center font-normal font-sans">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div className=" flex flex-col justify-start">
                    <label
                      htmlFor="password"
                      className="font-sans text-sm  uppercase"
                    >
                      Password
                    </label>
                    <Field name="password" component={Passwordshowhide} />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="password" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    disabled={loading ? true : false}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                  >
                    Log in
                  </button>
                </div>
              </Form>
            </>
          </Formik>
    
          <div className="flex flex-col md:flex-row space-y-3 justify-center space-x-12 pt-6 pb-12 font-sans items-center">
            <Link to="/register">
              <p className="text-md">
                Don't have an account?{" "}
                <span className="text-green-500 border-b-[1.5px] border-green-500">Register</span>
              </p>
            </Link>
            <Link to="/forgotpassword">
              <span className="text-green-500 border-b-[1.5px] border-green-500">
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
