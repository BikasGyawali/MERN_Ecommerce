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
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAIL,
  SINGLE_USER_REQUEST,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_FAIL,
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
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const { data } = await axios.post(
      "http://localhost:4000/api/register",
      formData
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
export const updateUser = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axios.post(
      `http://localhost:4000/api/updateuser/${id}`,
      formData
    );
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

//get all users Admin
export const getallUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:4000/api/admin/getallusers`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data,
    });
  }
};

//get single user --Admin
export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_USER_REQUEST });
    const { data } = await axios.get(
      `http://localhost:4000/api/admin/getuser/${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: SINGLE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_USER_FAIL,
      payload: error.response.data,
    });
  }
};

//update single user --Admin
export const updateSingleUser = (id, values) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ADMIN_REQUEST });
    const { data } = await axios.put(
      `http://localhost:4000/api/admin/updatesingleuser/${id}`,
      { values },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: UPDATE_USER_ADMIN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ADMIN_FAIL,
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
