import React, { useState } from "react";

const Passwordshowhide = ({ field }) => {
  const [passwordshown, setPasswordShown] = useState(false);

  const handleClick = () => {
    setPasswordShown(!passwordshown);
  };
  return (
    <>
      <div className="relative flex justify-center items-center">
        <input
          {...field}
          className=" input-field mt-2 font-jakarta border appearance-none  h-12 py-2 px-3  w-72 lg:w-[30vw]  leading-tight focus:outline-none focus:shadow-outline"
          type={passwordshown ? "text" : "password"}
          placeholder="Password"
        />
        <p className="">
          <i
            className={
              passwordshown
                ? "absolute right-2 fa-solid fa-eye top-6"
                : "absolute right-2 fa-solid fa-eye-slash top-6"
            }
            onClick={handleClick}
          />
        </p>
      </div>
    </>

    // border-t-[1px]  border-l-[1px]   border-b-[1px]
    //border-t-[1px] border-r-[1px]  border-b-[1px]
    // pt-[21px] pb-[14px]  border-t-[1px]  border-r-[1px]  border-b-[1px]
  );
};

export default Passwordshowhide;
