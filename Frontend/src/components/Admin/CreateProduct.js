import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Sidebar from "../Admin/Sidebar";
import { createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (success) {
      window.alert("Product created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("description", values.description);
    formData.set("category", values.category);
    formData.set("price", values.price);
    formData.set("stock", values.stock);
    formData.set("image", values.image);
   
    dispatch(createProduct(formData));
  };
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex w-full py-6 md:py-16login flex-col bg-gray-5  h-screen font-bold rounded px-auto justify-start items-center">
          <div className="text-sm md:text-md lg:text-lg xl:text-xl md:shadow-lg md:rounded md:w-[60%]   bg-white flex flex-col justify-center items-center">
            <p className="font-sans px-3 pt-2 text-red-500 font-bold">
              Create Product
            </p>
            <Formik
              initialValues={{
                name: "",
                description: "",
                category: "",
                price: "",
                stock: "",
              }}
              validationSchema={yup.object().shape({
                name: yup.string().required("Please enter product name"),
                description: yup
                  .string()
                  .required("Please enter product description"),
                category: yup
                  .string()
                  .required("Please select any one of the categories"),
                price: yup.number().required("Please enter the price"),
                stock: yup.string().required("Please update the stock"),
              })}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className=" text-sm md:text-md lg:text-lg xl:text-xl  pt-6 pb-10 h-400 w-96 flex flex-col justify-center items-center">
                    <div className="mb-4 flex flex-col justify-start ">
                      <label
                        htmlFor="name"
                        className="font-sans text-sm lg:text-lg uppercase"
                      >
                        NAME
                      </label>
                      <Field
                        className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-64 md:w-72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
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
                        htmlFor="description"
                        className="font-sans  text-sm lg:text-lg uppercase"
                      >
                        Description
                      </label>
                      <Field
                        className="mt-2  font-sans appearance-none border h-32 py-2 px-3  w-64 md:w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="description"
                        placeholder="Description"
                      />
                      <p className="text-red-500 center font-normal font-sans">
                        <ErrorMessage name="description" />
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col justify-start">
                      <label
                        htmlFor="category"
                        className="font-sans text-sm lg:text-lg uppercase"
                      >
                        Category
                      </label>
                      <Field
                        as="select"
                        className="mt-2 font-jakarta border h-12 py-2 px-3   w-64 md:w-72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="category"
                      >
                        <option disabled value="">
                          Select category
                        </option>
                        <option value="camera">Camera</option>
                        <option value="phone">Phone</option>
                        <option value="food">Food</option>
                        <option value="laptop">Laptop</option>
                      </Field>
                      <p className="text-red-500 center font-sans font-normal">
                        <ErrorMessage name="category" />
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col justify-start">
                      <label
                        htmlFor="price"
                        className="font-sans text-sm lg:text-lg uppercase"
                      >
                        Price
                      </label>
                      <Field
                        className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-64 md:w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="price"
                        placeholder="Price"
                      />
                      <p className="text-red-500 center font-sans font-normal">
                        <ErrorMessage name="price" />
                      </p>
                    </div>
                    <div className="mb-4 flex flex-col justify-start">
                      <label
                        htmlFor="stock"
                        className="font-sans text-sm lg:text-lg uppercase"
                      >
                        Stock
                      </label>
                      <Field
                        className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-64 md:w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                      />

                      <p className="text-red-500 center font-sans font-normal">
                        <ErrorMessage name="stock" />
                      </p>
                    </div>
                    <div className=" flex flex-col justify-start">
                      <label
                        htmlFor="image"
                        className="font-sans text-sm lg:text-lg uppercase"
                      >
                        Image
                      </label>
                      <input
                        className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-64 md:w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
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
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 font-sans mb-6 text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                    >
                      Add Product
                    </button>
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

export default CreateProduct;
