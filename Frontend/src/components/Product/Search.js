import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <form className="flex  font-sans font-bold text-md" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        className="md:hidden  rounded shadow flex border-none xl:flex pl-2 py-1 xl:w-96"
        placeholder="Search a Product ..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="md:hidden flex p-3 xl:flex bg-orange-600 shadow rounded"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
