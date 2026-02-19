import React, { useState } from "react";
import CompanyDetails from "./CompanyDetails";
import BranchDetails from "./BranchDetails";

const CompanySetup = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <>
      {/* Page Title */}
      <h5 className="text-lg font-semibold dark:text-slate-100 mb-4">
        Company Setup
      </h5>

      {/* Tabs */}
      <div className="flex gap-3  mb-3">
        <button
          onClick={() => setActiveTab("company")}
          className={`pb-2 text-sm font-medium transition
            ${
              activeTab === "company"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500  hover:text-slate-700 dark:text-slate-200"
            }
          `}
        >
          🏢 Company Details
        </button>

        <button
          onClick={() => setActiveTab("branch")}
          className={`pb-2 text-sm font-medium transition
            ${
              activeTab === "branch"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-200"
            }
          `}
        >
          📍 Branch Details
        </button>
      </div>

      {/* Screen Content */}
      {activeTab === "company" && <CompanyDetails />}
      {activeTab === "branch" && <BranchDetails />}
    </>
  );
};

export default CompanySetup;



