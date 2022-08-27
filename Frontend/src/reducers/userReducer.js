import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ERRORS,
  UPDATE_USER_ADMIN_REQUEST,
  UPDATE_USER_ADMIN_SUCCESS,
  UPDATE_USER_ADMIN_FAIL,
  UPDATE_USER_ADMIN_RESET,
  SINGLE_USER_REQUEST,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from "../constants/userConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        ...state,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case LOG_OUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOG_OUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_ADMIN_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_ADMIN_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_USER_FAIL:
    case UPDATE_USER_ADMIN_FAIL:
    case CHANGE_PASSWORD_FAIL:
    case FORGOT_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_RESET:
    case UPDATE_USER_ADMIN_RESET:
    case CHANGE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const singleUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case SINGLE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
