import React from "react";
import Img from "../../images/1.jpg";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
 
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.review.stars,
    isHalf: true,
  };
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div className="flex flex-col h-44 w-44 md:h-64 md:w-64 lg:h-80 lg:w-80 rounded shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300 hover:shadow-2xl">
          <img src={`http://localhost:4000/`+ product.image} className="rounded h-full w-full" alt="img" />
          <div className="pl-2 pt-2">
            <p>{product.name}</p>

            <ReactStars {...options} />

            <p>${product.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Products;
