import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { updateUser, clearErrors, verifyUser } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState();

  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      window.alert("User updated successfully");
      dispatch(verifyUser());
      navigate("/profile");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  const { loading, user } = useSelector((state) => state.auth);
  console.log(user);
  const [oldImg, setOldImg] = useState(user && user.user && user.user.image);

  const handleSubmit = (values) => {
    const id = user && user && user.user._id;
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("image", values.image);
    for (let value of formData.values()) {
      console.log(value);
    }
    dispatch(updateUser(id, formData));
  };

  return (
    <>
      {user && user.token ? (
        <>
          <div className="flex  login flex-col bg-gray-100 py-8 md:py-12 font-bold rounded px-auto justify-center items-center">
            <div className="shadow-lg rounded w-[90%] md:w-[60%] lg:w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
              <p className="font-sans px-3 pt-2 text-red-500 font-bold text-xl md:text-2xl">
                Update User
              </p>
              <Formik
                initialValues={user.user || { name: "", email: "" }}
                validationSchema={yup.object().shape({
                  name: yup.string().required("Please enter your name"),
                  email: yup
                    .string()
                    .email()
                    .required("Please enter your email address"),
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
                      <div className=" flex flex-col justify-start">
                        <label
                          htmlFor="image"
                          className="font-sans text-sm lg:text-lg uppercase"
                        >
                          Image
                        </label>
                        <input
                          className="mt-2 font-sans appearance-none border h-12 py-2 px-3 w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
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
                              setOldImg();
                            }
                          }}
                        />
                        {oldImg && (
                          <img
                            src={`http://localhost:4000/` + oldImg}
                            className="h-32 w-32 md:h-40 md:w-40 mt-4 rounded-full"
                            alt="user"
                          />
                        )}
                        {img && (
                          <img
                            src={img}
                            className="h-32 w-32 md:h-40 md:w-40 mt-4 rounded-full "
                            alt="user"
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
                        className="bg-blue-600 hover:bg-blue-500 mb-12 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                      >
                        UPDATE
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center bg-gray-100 items-center h-[80vh]">
            <p className="font-sans text-4xl uppercase mb-8">
              You Need To Be Signed In to View This Page
            </p>

            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-500 font-sans text-white tracking-widest uppercase py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl">
                Log in
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
