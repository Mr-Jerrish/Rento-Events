import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import Tooltip from "../commonfile/Tooltip";
import { toast } from "react-hot-toast";
import api from "../../utilis/api";

import { useGlobal } from "../context/GlobalContext";
const Global = () => {
  const {
    year,
    setYear,
    branchId,
    setBranchId,
    branchName,
    setBranchName,
    years,
  } = useGlobal();
  const [branchDetails, setBranchDetails] = useState([]);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    getBranchDetails();
  }, []);

  const getBranchDetails = async () => {
    try {
      const res = await api.get("/company/getBranchDetails");
      const branches = res.data.paramObjectsMap.data;
      setBranchDetails(branches);
      if (branchDetails.length > 0) {
        const firstBranch = branchDetails[0];
        setBranchId(firstBranch._id);
        setBranchName(firstBranch.branchName);
      }
    } catch (error) {
      console.error("Error fetching branch details", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <Tooltip text="Global Settings" position="bottom">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full
            border border-slate-300 dark:border-slate-400
            text-slate-700 dark:text-slate-100
            bg-white dark:bg-slate-800
            shadow-md
            hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]
            hover:border-indigo-500
            hover:text-indigo-600 dark:hover:text-indigo-400
            hover:scale-110
            transition-all duration-300 ease-out"
        >
          <Globe size={16} />
        </button>
      </Tooltip>

      {open && (
        <div
          className="absolute right-0 mt-3 w-60
            rounded-2xl
            bg-white dark:bg-slate-900/90
            border border-slate-200/60 dark:border-slate-700
            shadow-[0_0_25px_rgba(59,130,246,0.35)]
            dark:shadow-[0_0_25px_rgba(168,85,247,0.35)]
            p-3 flow-hidden"
        >
          <div className="text-center pb-2 mb-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Global Settings
            </p>
          </div>

          {/* -------- BRANCH -------- */}

          <div className="flex flex-col mb-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Select Branch
            </p>

            <select
              className="w-full px-2 py-0 border rounded-lg 
    dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={branchId}
              onChange={(e) => {
                const selected = branchDetails.find(
                  (item) => item._id === e.target.value,
                );

                if (selected) {
                  setBranchId(selected._id);
                  setBranchName(selected.branchName);
                }
              }}
            >
              {branchDetails.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.branchName}
                </option>
              ))}
            </select>
          </div>

          {/* -------- YEAR -------- */}
          <div className="flex flex-col mb-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Select Year
            </p>

            <select
              className="w-full px-2 py-0 border rounded-lg 
    dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default Global;
