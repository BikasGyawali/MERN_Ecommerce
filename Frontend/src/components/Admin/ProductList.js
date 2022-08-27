import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import Sidebar from "../Admin/Sidebar";

import {
  getProductsAdmin,
  clearErrors,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {
  const navigate = useNavigate();
  const pageSize = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updatedeleteproduct
  );

  useEffect(() => {
    dispatch(getProductsAdmin());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      window.alert("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts =products && products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[80%]">
          {products && products.length >= 1 ? (
            <>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl md:text-2xl font-sans font-bold uppercase pb-4">
                  Products
                </p>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[60%] flex  bg-gray-100 justify-center items-center shadow rounded p-3 mb-4"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left font-sans  dark:text-gray-400">
                  <thead className="text-sm md:text-md lg:text-lg xl:text-xl  bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap ">
                        Id
                      </th>
                      <th scope="col" className="py-3 px-6 whitespace-nowrap ">
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3   px-6  whitespace-nowrap"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="py-3  px-6   whitespace-nowrap"
                      >
                        Stock
                      </th>
                      <th scope="col" className="py-3  px-6  whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" font-sans font-[600]">
                    {currentPosts &&
                      currentPosts
                        .filter((val) => {
                          if (searchTerm === "") {
                            return val;
                          } else if (
                            val.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            val._id
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((value, index) => {
                          return (
                            <tr
                              className="text-sm md:text-md lg:text-lg xl:text-xl bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                              key={index}
                            >
                              <td className="py-3 px-6 whitespace-nowrap">
                                {value._id}
                              </td>
                              <td className="py-3 px-6 whitespace-nowrap">
                                {value.name}
                              </td>

                              <td className="py-3 px-6 whitespace-nowrap">
                                ${value.price}
                              </td>
                              <td className=" py-3 px-6 whitespace-nowrap">
                                {value.stock}
                              </td>
                              <td className="flex py-3 px-6 whitespace-nowrap">
                                <Link to={`/update/${value._id}`}>
                                  <p className="text-2xl">
                                    <i className="fa-solid fa-edit"></i>
                                  </p>
                                </Link>
                                <button
                                  onClick={() =>
                                    deleteProductHandler(value._id)
                                  }
                                >
                                  <p className="text-2xl">
                                    <i className="fa-solid fa-trash-can"></i>
                                  </p>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
                <Pagination
                  totalPosts={products.length}
                  pageSize={pageSize}
                  paginate={paginate}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center h-screen font-sans font-bold text-2xl lg:text-4xl">
                No products at the moment
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
