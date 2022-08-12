import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import Passwordshowhide from "../Passwordshowhide";
import {
  clearErrors,
  verifyUser,
  changePassword,
} from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PASSWORD_RESET } from "../../constants/userConstants";

const ChangePassword = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const { isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated && !isUpdated.success) {
      window.alert(isUpdated.error);
    }
    if (isUpdated && isUpdated.success) {
      window.alert("Password updated successfully");
      dispatch(verifyUser());
      navigate("/profile");
      dispatch({
        type: CHANGE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  const handleSubmit = (values) => {
    values.id = user.user._id;

    dispatch(changePassword(values));
  };

  return (
    <>
      {user && user.token ? (
        <>
          <div className="flex pt-12 pb-24 login flex-col bg-gray-100 h-[70vh] font-bold rounded px-auto justify-center items-center">
            <div className="shadow-lg rounded w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
              <p className="font-sans px-3 pt-2 text-red-500 font-bold text-2xl">
                Change Password
              </p>
              <Formik
                initialValues={{ oldPassword: "", newPassword: "" }}
                validationSchema={yup.object().shape({
                  oldPassword: yup
                    .string()
                    .required("Please enter your old password")
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                    ),
                  newPassword: yup
                    .string()
                    .required("Please enter your new password")
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
                      <div className=" mb-4 flex flex-col justify-start">
                        <label
                          htmlFor="oldPassword"
                          className="font-sans text-sm lg:text-lg uppercase"
                        >
                          Old Password
                        </label>
                        <Field
                          name="oldPassword"
                          component={Passwordshowhide}
                        />
                        <p className="text-red-500 center font-sans font-normal">
                          <ErrorMessage name="oldPassword" />
                        </p>
                      </div>
                      <div className=" flex flex-col justify-start">
                        <label
                          htmlFor="newPassword"
                          className="font-sans text-sm lg:text-lg uppercase"
                        >
                          New Password
                        </label>
                        <Field
                          name="newPassword"
                          component={Passwordshowhide}
                        />
                        <p className="text-red-500 center font-sans font-normal">
                          <ErrorMessage name="newPassword" />
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center ">
                      <button
                        disabled={loading ? true : false}
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 mb-12 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
                      >
                        CHANGE
                      </button>
                    </div>
                  </Form>
                </>
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

export default ChangePassword;
