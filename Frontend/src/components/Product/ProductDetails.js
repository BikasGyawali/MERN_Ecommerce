import React, { useState, useEffect } from "react";
import Img from "../../images/1.jpg";
import { getProductDetails, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../../actions/cartAction";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, details } = useSelector(
    (state) => state.productDetails
  );

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  const increaseQuantity = () => {
    if (quantity >= details.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    const data = cartItems.filter((item) => item && item.productId === id);
    if (data.length > 0) {
      window.alert("Item is already added to cart");
    } else {
      dispatch(addItemToCart(id, quantity));
      window.alert("Item Added To Cart");
    }
  };



  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: details && details.review && details.review.stars,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen text-4xl">
            LOADING...
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row justify-evenly bg-gray-200 py-12 px-12 md:px-32 w-full">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src={`http://localhost:4000/` + details.image}
              className="w-full md:w-5/6"
              alt="/product"
            />
          </div>
          <div className="flex w-full md:w-1/2 flex-col space-y-6 font-sans font-bold justify-start pt-8 items-start md:pl-12">
            <p className="text-xl md:text-2xl w-full tracking-wide">
              {details.name}
            </p>
            <ReactStars {...options} />

            <span className="text-xl md:text-2xl font-sans">
              ${details.price}
            </span>
            <div className="flex justify-center items-center space-x-3">
              <button
                className="bg-red-500 p-1 h-8 w-8 rounded shadow-sm"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="">{quantity}</span>
              <button
                className="bg-blue-500 p-1 h-8 w-8 rounded shadow-sm"
                onClick={increaseQuantity}
              >
                +
              </button>
              <button
                className="px-3 py-2 w-44 rounded-full tracking-widest uppercase bg-orange-500 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 hover:shadow-2xl"
                disabled={details.stock === 0}
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
            {details && details.stock >= 1 ? (
              <span className="text-sm md:text-md lg:text-lg xl:text-xl  font-bold">
                Status: IN STOCK
              </span>
            ) : (
              <span className="text-sm md:text-md lg:text-lg xl:text-xl font-bold">
                Status: OUT OF STOCK
              </span>
            )}
            <p className="text-sm md:text-md lg:text-lg xl:text-xl font-medium w-full text-justify">
              {details.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
