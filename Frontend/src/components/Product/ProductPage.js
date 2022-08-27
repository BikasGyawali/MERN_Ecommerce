import React, { useEffect, useState } from "react";
import Products from "./Products";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Pagination from "../Pagination";

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
 
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page) => {
    setCurrentPage(page);
  };

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
        <div className="bg-gray-100 w-full py-4 ">
          <p className="uppercase tracking-widest flex justify-center text-xl font-bold font-sans md:text-xl">
            All Products
          </p>
          <div className="flex flex-col">
            <div className="flex w-full flex-row justify-between gap-y-28  px-2 items-center flex-wrap pt-12 pb-24">
              {keyword ? (
                <>
                  <div className="flex w-full justify-center gap-x-12 items-center flex-row font-sans font-bold uppercase">
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
                  <div className="flex flex-row w-full justify-between items-center gap-y-28 flex-wrap">
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
                        <>
                          <div className="flex justify-center items-center py-12 font-sans font-bold uppercase">
                            No such Product
                          </div>
                        </>
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
                    <Pagination
                      totalPosts={products.length}
                      pageSize={pageSize}
                      paginate={paginate}
                    />
                  </div>
                </>
              ) : (
                currentPosts &&
                currentPosts.map((product) => {
                  return (
                    <>
                      <Products product={product} key={product._id}></Products>
                    </>
                  );
                })
              )}
            </div>
            <Pagination
              totalPosts={products.length}
              pageSize={pageSize}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
