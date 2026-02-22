// import React from "react";
// import { Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const menuItems = [
//   { name: "Dashboard", path: "/dashboard" },
//   { name: "Company Setup", path: "/dashboard/companysetup" },
//   { name: "Item", path: "/dashboard/BasicMaster/Item" },
//   { name: "Customer", path: "/dashboard/BasicMaster/Customer" },
//   { name: "Employee", path: "/dashboard/BasicMaster/EmployeeDetails" },
// ];
// const Searchbar = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const filtered = menuItems.filter((item) => {
//     item.name.toLowerCase().includes(search.toLowerCase());
//   });
//   return (
//     <>
//       <div className="hidden sm:flex flex-1 max-w-md mx-4">
//         <div className="relative w-full">
//           <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 text-slate-100 w-8 h-8 p-1 rounded-full border-2 border-slate-300 bg-blue-600" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="
//               w-full pl-8 pr-4 py-1
//               bg-white
//               border border-gray-400
//               dark:text-slate-900
//               rounded-lg
//               text-sm
//               focus:outline-none
//             "
//           />
//         </div>
//         {search && (
//           <div className="absolute top-12 w-full bg-white shadow-lg rounded-xl border border-gray-200 z-50">
//             {filtered.length > 0 ? (
//               filtered.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     navigate(item.path);
//                     setSearch("");
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                 >
//                   {item.name}
//                 </div>
//               ))
//             ) : (
//               <div className="px-4 py-2 text-gray-400 text-sm">
//                 No results found
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Searchbar;
//

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Company Setup", path: "/dashboard/companysetup" },
  { name: "Basic Master", path: "/dashboard/BasicMaster" },
  { name: "Item", path: "/dashboard/BasicMaster/Item" },
  { name: "Customer", path: "/dashboard/BasicMaster/Customer" },
  { name: "Employee", path: "/dashboard/BasicMaster/EmployeeDetails" },
];

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  const filtered =
    search.trim() === ""
      ? menuItems
      : menuItems.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl shadow-sm">
        <Search className="w-4 h-4 text-gray-400" />

        <input
          type="text"
          value={search}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 200)}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
        />

        {search && (
          <X
            onClick={() => setSearch("")}
            className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500"
          />
        )}
      </div>

      {/* Dropdown */}
      {focus && (
        <div
          className="absolute mt-2 w-full max-h-60 
        overflow-y-auto bg-white dark:bg-slate-900 border border-gray-200  dark:border-slate-700 rounded-xl  z-50
         shadow-[0_0_25px_rgba(59,130,246,0.35)]
            dark:shadow-[0_0_25px_rgba(168,85,247,0.35)]
         
        "
        >
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => {
                  navigate(item.path);
                  setSearch("");
                  setFocus(false);
                }}
                className="px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-center text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
