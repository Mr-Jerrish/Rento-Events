import React, { useEffect, useState } from "react";

import Myshop from "../images/MyShop.png";
import { useGlobal } from "../context/GlobalContext";
const ComapnyLogo = () => {
  const { year, branchName } = useGlobal();

  return (
    <>
      <div className="flex flex-row gap-1">
        <img
          src={Myshop}
          alt="Logo"
          className="h-6 w-6  md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain"
        />
        <div className="flex flex-col items-center justify-center">
          <h6 className="text-sm font-semibold dark:text-slate-100">
            SAIT RENTAL ENTERPRISES
          </h6>
          <button className="bg-blue-700 tracking-wide text-white px-2 py-1 text-xs rounded-md">
            {/* NATHAM - 2026 */}
            {`${branchName} - ${year}`}
          </button>
        </div>
      </div>
    </>
  );
};

export default ComapnyLogo;
