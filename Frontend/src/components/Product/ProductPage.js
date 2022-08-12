import React, { useEffect, useState } from "react";
import Products from "./Products";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { keyword } = useParams();
  const categories = ["phone", "camera", "laptop", "food"];
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productsCount,
    filteredProducts,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  console.log(products);
  console.log(filteredProducts);

  useEffect(() => {
    dispatch(getProducts(keyword, category));
  }, [dispatch, keyword, category]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-4xl font-sans">LOADING ...</p>
        </div>
      ) : (
        <div className="bg-gray-100 w-full  mt-12 pb-20 ">
          <p className="uppercase tracking-widest flex justify-center text-xl font-bold font-sans pt-8 pb-4 md:text-2xl">
            Featured Products
          </p>
          <div className="flex w-full justify-center gap-x-6 items-center flex-wrap gap-y-6 md:gap-y-8 lg:gap-y-12">
            {keyword ? (
              <>
                <div className="flex w-[8vw] justify-start items-start space-y-2 flex-col font-sans font-bold uppercase">
                  <h3>Categories</h3>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <>
                          <ul className="">
                            <li
                              key={category}
                              className="cursor-pointer"
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          </ul>
                        </>
                      );
                    })}
                </div>
                <div className="flex  justify-start items-center space-x-6 flex-wrap ml-6">
                  {filteredProducts ? (
                    filteredProductsCount > 0 ? (
                      filteredProducts.map((product) => {
                        return (
                          <Products
                            product={product}
                            category={category}
                            key={product._id}
                          />
                        );
                      })
                    ) : (
                      <>No such Product</>
                    )
                  ) : (
                    products &&
                    products.map((product) => {
                      return (
                        <Products
                          product={product}
                          category={category}
                          key={product._id}
                        />
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              products &&
              products.map((product) => {
                return (
                  <Products product={product} key={product._id}></Products>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
