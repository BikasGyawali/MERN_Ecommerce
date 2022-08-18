import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer,newProductReducer,productUpdateDeleteReducer } from "./reducers/productReducer";
import { productDetailsReducer } from "./reducers/productReducer";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  singleUserReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  allOrdersReducer,
  updateOrderReducer
} from "./reducers/orderReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct:newProductReducer,
  auth: authReducer,
  updatedeleteproduct:productUpdateDeleteReducer,
  user: userReducer,
  allUsers:allUsersReducer,
  singleUser:singleUserReducer,
  cart: cartReducer,
  updateOrder:updateOrderReducer,
  forgotPassword: forgotPasswordReducer,
  newOrder: newOrderReducer,
  allOrders:allOrdersReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
