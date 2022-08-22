import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUser,
  clearErrors,
  updateSingleUser,
} from "../../actions/userAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Sidebar from "./Sidebar";
import { UPDATE_USER_ADMIN_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSingleUser(id));

    if (error) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      window.alert("User updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_ADMIN_RESET });
    }
  }, [dispatch, error, loading, isUpdated]);

  const { user } = useSelector((state) => state.singleUser);


  const handleSubmit = (values) => {
    dispatch(updateSingleUser(id, values));
  };
  
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex w-full text-sm md:text-md lg:text-lg xl:text-xl py-6 md:py-12 login flex-col bg-gray-5 font-bold rounded px-auto justify-start items-center">
          <div className="md:shadow-lg md:rounded  md:w-[60%]   bg-white flex flex-col justify-center items-center">
            <p className="font-sans px-3 pt-2 text-red-500 font-bold text-xl md:text-2xl">
              Update User
            </p>
            <Formik
              enableReinitialize
              initialValues={
                user.user || {
                  name: "",
                  email: "",
                  role: "",
                }
              }
              validationSchema={yup.object().shape({
                name: yup.string().required("Please enter product name"),
                email: yup
                  .string()
                  .email()
                  .required("Please enter email"),
                role: yup
                  .string()
                  .required("Please select any one of the options"),
              })}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <div className="px-8 pt-6 pb-8 md:w-96 flex flex-col justify-center items-center">
                    <div className="mb-4 flex flex-col justify-start ">
                      <label
                        htmlFor="name"
                        className="font-sans  uppercase"
                      >
                        NAME
                      </label>
                      <Field
                        className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-64 md:72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        placeholder="Enter Product name"
                      />
                      <p className="text-red-500 center font-normal font-sans">
                        <ErrorMessage name="name" />
                      </p>
                    </div>
                    <div className="mb-4  flex flex-col justify-start">
                      <label
                        htmlFor="email"
                        className="font-sans   uppercase"
                      >
                        Email
                      </label>
                      <Field
                        className="mt-2  font-sans appearance-none border h-12 py-2 px-3 w-64 md:72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="email"
                        placeholder="Email"
                      />
                      <p className="text-red-500 center font-normal font-sans">
                        <ErrorMessage name="email" />
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col justify-start">
                      <label
                        htmlFor="role"
                        className="font-sans  uppercase"
                      >
                        Role
                      </label>
                      <Field
                        as="select"
                        className="mt-2 font-jakarta border h-12 py-2 px-3  w-64 md:72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="role"
                      >
                        <option disabled value="">
                          Select role
                        </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Field>
                      <p className="text-red-500 center font-sans font-normal">
                        <ErrorMessage name="category" />
                      </p>
                    </div>
                    <div className="flex justify-center items-center ">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 font-sans mb-6 text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
