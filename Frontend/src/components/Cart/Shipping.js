import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const handleSubmit = (values) => {
    
    dispatch(saveShippingInfo(values));
    navigate("/confirm");
  };

  return (
    <>
      <div className="flex py-8 md:py-12 login flex-col bg-gray-100  font-bold rounded px-auto justify-center items-center">
        <div className="shadow-lg rounded w-[90%] md:w-[60%] lg:w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
          <p className="font-sans mb-6 font-bold text-red-500 text-xl md:text-2xl">
            SHIPPING INFO
          </p>
          <Formik
            enableReinitialize
            initialValues={
              shippingInfo || {
                state: "",
                city: "",
                tole: "",
                nearestLandmark: "",
                phoneNo: "",
              }
            }
            validationSchema={yup.object().shape({
              state: yup
                .string()
                .required("Please select any one of the options"),
              city: yup
                .string()
                .required("Please select any one of the options"),
              tole: yup
                .string()
                .required("Please select any one of the options"),
              nearestLandmark: yup
                .string()
                .required("Please select any one of the options"),
              phoneNo: yup
                .string()
                .matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
                )
                .required("Please select any one of the options"),
            })}
            onSubmit={handleSubmit}
          >
            <>
              <Form>
                <div className="px-8 pt-6 pb-8 h-400 w-96 flex flex-col justify-center items-center">
                  <div className="mb-4  flex flex-col justify-start">
                    <label
                      htmlFor="state"
                      className="font-sans text-sm  uppercase"
                    >
                      State
                    </label>
                    <Field
                      as="select"
                      className="mt-2 font-jakarta border h-12 py-2 px-3  w-72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="state"
                    >
                      <option disabled value="">
                        Select any one of the states
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">Australia</option>
                    </Field>
                    <p className="text-red-500 center font-normal font-sans">
                      <ErrorMessage name="state" />
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="city"
                      className="font-sans text-sm  uppercase"
                    >
                      City
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="city"
                      placeholder="City"
                    />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="city" />
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="tole"
                      className="font-sans text-sm  uppercase"
                    >
                      Tole
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="tole"
                      placeholder="Tole"
                    />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="tole" />
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="nearestLandmark"
                      className="font-sans text-sm  uppercase"
                    >
                      Nearest Landmark
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="nearestLandmark"
                      placeholder="Nearest Landmark"
                    />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="nearestLandmark" />
                    </p>
                  </div>
                  <div className="mb-4 flex flex-col justify-start">
                    <label
                      htmlFor="phoneNo"
                      className="font-sans text-sm  uppercase"
                    >
                      Phone Number
                    </label>
                    <Field
                      className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="phoneNo"
                      placeholder="Phone Number"
                    />
                    <p className="text-red-500 center font-sans font-normal">
                      <ErrorMessage name="phoneNumber" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-6 items-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                  >
                    Next
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

export default Shipping;
