import React from "react";
import ProductPage from "./Product/ProductPage";
const Hero = () => {
  return (
    <>
      <div className="flex bg-[url('images/7.jpg')] bg-center bg-cover bg-no-repeat h-[30vh] md:h-[60vh] lg:h-[90vh]">
        
        <div   className="flex flex-col mx-auto justify-center">
          <div><p className="text-xl  font-sans font-bold text-white tracking-widest uppercase md:text-4xl lg:text-5xl xl:text-6xl">
            {" "}
            The Joy of Right Gadgets.
          </p></div>
          <button className="h-12 w-28 px-2  py-2 mt-4 text-white bg-indigo-900">
          EXPLORE 
          </button>
        </div>
      </div>
      <ProductPage/>
    </>
  );
};

export default Hero;
