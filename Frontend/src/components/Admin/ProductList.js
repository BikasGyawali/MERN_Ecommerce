 import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import _ from "lodash";
import { getProductsAdmin, clearErrors, deleteProduct } from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {
  const navigate=useNavigate(); 
  const pageSize = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState();
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const {error:deleteError, isDeleted}=useSelector(state=>state.updatedeleteproduct);

  useEffect(() => {
    dispatch(getProductsAdmin());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted){
      window.alert('Product Deleted Successfully')
      navigate("/admin/products");  
      dispatch({type:DELETE_PRODUCT_RESET})
    }
    setPaginatedPosts(_(products).slice(0).take(pageSize).value());
  }, [dispatch, error,deleteError,isDeleted ]);

  const pageCount = products ? Math.ceil(products.length / pageSize) : 0;
  //if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * pageSize;
    const paginatedPost = _(products).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  };

  const deleteProductHandler=(id)=>{
    dispatch(deleteProduct(id))

  }
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <table className="flex bg-gray-50 flex-col items-center py-12">
            <p className="text-2xl font-sans font-bold uppercase pb-8 ">
              All Products{" "}
            </p>
            <input
              type="text"
              placeholder="Search"
              className="w-[60%] flex bg-gray-100 justify-center items-center shadow rounded p-3 my-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <thead className="w-[80%] border-[1.5px] border-b-0 border-black flex justify-between font-bold items-center py-3">
              <th className="flex w-[18%] justify-center items-center">
                 Id
              </th>
              <th className="flex w-[18%] justify-center items-center">Name</th>
              <th className="flex w-[18%] justify-center items-center">
                Price
              </th>
              <th className="flex w-[18%] justify-center items-center">Stock</th>
              <th className="flex w-[18%] justify-center items-center">
                Actions
              </th>
            </thead>

            <tbody className="w-[80%] font-sans font-[600] flex flex-col border-[1.5px] border-black py-3">
              {paginatedPosts &&
                paginatedPosts
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val._id.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((value, index) => {
                    return (
                      <tr
                        key={index}
                        className="flex justify-between items-center space-y-4"
                      >
                        <td className="flex w-[18%] justify-center items-center">
                          {value._id}
                        </td>
                        <td className=" flex w-[18%] justify-center items-center">
                          {value.name}
                        </td>

                        <td className=" flex w-[18%] justify-center items-center">
                          ${value.price}
                        </td>
                        <td className="flex w-[18%] justify-center items-center">
                          {value.stock}
                        </td>
                        <td className="flex gap-x-2 w-[18%] justify-center items-center ">
                          <Link to={`/update/${value._id}`}>
                            <p className="text-2xl">
                              <i className="fa-solid fa-edit"></i>
                            </p>
                          </Link>
                          <button onClick={()=>deleteProductHandler(value._id)}>
                            <p className="text-2xl">
                              <i className="fa-solid fa-trash-can"></i>
                            </p> 
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
            <nav className="pt-8 flex justify-center items-center">
              <ul className="flex text-xl space-x-4">
                {pages.map((page) => {
                  return (
                    <li
                      className={
                        page === currentPage
                          ? "bg-blue-500 px-2 rounded shadow hover:cursor-pointer"
                          : "bg-gray-50 hover:cursor-pointer"
                      }
                    >
                      <p onClick={() => pagination(page)}>{page}</p>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
