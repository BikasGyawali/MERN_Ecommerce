import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

//user
export const getProducts =
  (keyword = "", category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `http://localhost:4000/api/getallitem?keyword=${keyword}`;

      console.log(category);
      if (category) {
        link = `http://localhost:4000/api/getallitem?keyword=${keyword}&category=${category}`;
      }
      console.log(link);
      const { data } = await axios.get(link);
      console.log(data);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
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

//user
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:4000/api/getsingleitem/${id}`
    );
    console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.item,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//admin get all products
export const getProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(`http://localhost:4000/api/admin/getitem`);
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create new product Admin
export const createProduct = (formData) => async (dispatch) => {
  try {
    for (let value of formData.values()) {
      console.log(value);
    }

    dispatch({ type: NEW_PRODUCT_REQUEST });
    const { data } = await axios.post(
      `http://localhost:4000/api/admin/additem`,
      formData
    );
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};
