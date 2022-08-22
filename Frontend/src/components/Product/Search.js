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
    <form className="flex  font-sans font-bold text-sm md:text-md" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        className="rounded shadow flex  border-none w-40 h-10 md:w-52 pl-2 py-1 xl:w-96"
        placeholder="Search ..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="flex h-10 w-16 justify-center items-center xl:flex bg-orange-600 shadow rounded"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
