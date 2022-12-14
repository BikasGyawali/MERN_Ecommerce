import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Passwordshowhide from "./Passwordshowhide";

import { useSelector, useDispatch } from "react-redux";
import { register, clearErrors } from "../actions/userAction";

const Register = () => {
  const [img, setImg] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("image", values.image);
    dispatch(register(formData));
  };

  return (
    <>
      <div className="flex py-12 login flex-col bg-gray-100 font-bold rounded px-auto justify-center items-center">
        <div className="shadow-lg rounded  w-[90%] md:w-[60%] lg:w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
          <p className="font-sans px-3 pt-2 text-red-500 font-bold text-xl md:text-2xl">
            SIGN UP
          </p>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Please enter your name"),
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
            {({ values, setFieldValue }) => (
              <Form>
                <div className="px-8 pt-6 pb-8 h-400 w-96 flex flex-col justify-center items-center">
                  <div className="mb-4 flex flex-col justify-start ">
                    <label
                      htmlFor="name"
                      className="font-sans text-sm lg:text-lg uppercase"
                    >
                      NAME
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                    />
                    <p className="text-red-500 center font-normal font-sans">
                      <ErrorMessage name="name" />
                    </p>
                  </div>
                  <div className="mb-4  flex flex-col justify-start">
                    <label
                      htmlFor="email"
                      className="font-sans  text-sm lg:text-lg uppercase"
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
                  <div className="mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="password"
                      className="font-sans text-sm lg:text-lg uppercase"
                    >
                      Password
                    </label>
                    <Field name="password" component={Passwordshowhide} />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="password" />
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="image"
                      className="font-sans text-sm lg:text-lg uppercase"
                    >
                      Image
                    </label>
                    <input
                      className="font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="file"
                      name="image"
                      placeholder="Image"
                      onChange={(e) => {
                        setFieldValue(
                          "image",
                          e.target.files[0],
                          e.target.files[0].name
                        );
                        if (e.target.files.length) {
                          setImg(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                    {img && (
                      <img
                        src={img}
                        className="h-32 w-32 md:h-40 md:w-40 mt-4"
                        alt="productdetails"
                      />
                    )}
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="image" />
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center ">
                  <button
                    disabled={loading ? true : false}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                  >
                    Create Account
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center pb-10 pt-6 font-sans items-center">
            <Link to="/login">
              <p className="text-md">
                Already have an account?{" "}
                <span className="text-green-500">Log in</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
