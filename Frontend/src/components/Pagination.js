import React from "react";

const Pagination = ({ totalPosts, pageSize,paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / pageSize); i++) {
    pageNumbers.push(i);
  }

 
  return (
    <>
      <nav className="py-3 flex justify-center items-center font-sans font-bold text-xl">
        <ul className="flex gap-x-2">
          {pageNumbers.map((page) => {
            return (
              <li onClick={()=>paginate(page)} className="px-3 py-2 rounded bg-gray-400 hover:cursor-pointer"key={page}>
                <a >{page}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
