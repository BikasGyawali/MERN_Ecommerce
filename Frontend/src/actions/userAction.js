import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "../constants/userConstants";

//login user
export const login = (values) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      "http://localhost:4000/api/login",
      values
    );
    dispatch(
      {
        type: LOGIN_SUCCESS,
        payload: data,
      },
      localStorage.setItem("token", data.token)
    );
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//register user
export const register = (values) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(
      "http://localhost:4000/api/register",
      values
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

//verifyuser
export const verifyUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/auth", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  try {
    dispatch(
      {
        type: LOG_OUT_SUCCESS,
      },
      localStorage.removeItem("token")
    );
  } catch (error) {
    dispatch({
      type: LOG_OUT_FAIL,
      payload: "error",
    });
  }
};

//Update user profile
export const updateUser = (values) => async (dispatch) => {
  try {
    console.log(values);
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axios.post("http://localhost:4000/api/updateuser", {
      values,
    });
    console.log(data);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data,
    });
  }
};

//Update password
export const changePassword = (values) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    const { data } = await axios.post(
      `http://localhost:4000/api/changepassword/${values.id}`,
      {
        values,
      }
    );

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

//forgot password
export const forgotPassword = (values) => async (dispatch) => {
  try {
    console.log(values);
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(
      `http://localhost:4000/api/forgotpassword`,
      {
        values,
      }
    );
    console.log(data);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

//Clear ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
