import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { forgotPassword } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { error, success, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      window.alert(error.error);
    }
    if (success) {
      window.alert(message);
    }
  }, [dispatch, error, success, message]);

  const handleSubmit = (values) => {
    dispatch(forgotPassword(values));
  };

  return (
    <>
      <div className="flex pt-12 pb-24 login flex-col bg-gray-100 h-[70vh] font-bold rounded px-auto justify-center items-center">
        <div className="shadow-lg rounded w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required("Please enter your email"),
            })}
            onSubmit={handleSubmit}
          >
            <>
              <Form>
                <div className="px-8 pt-6 pb-8 h-400 w-96 flex flex-col justify-center items-center">
                  <div className=" mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="email"
                      className="font-sans text-sm lg:text-lg uppercase"
                    >
                      Email
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 mb-12 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                  >
                    Send
                  </button>
                </div>
              </Form>
            </>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
