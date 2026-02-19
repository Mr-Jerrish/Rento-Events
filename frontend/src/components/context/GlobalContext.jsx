import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];
  const [year, setYear] = useState(
    localStorage.getItem("finYear") || currentYear.toString(),
  );
  const [branchId, setBranchId] = useState(
    localStorage.getItem("branchId") || "",
  );
  const [branchName, setBranchName] = useState(
    localStorage.getItem("branchName"),
  );
  useEffect(() => {
    localStorage.setItem("finYear", year);
  }, [year]);
  useEffect(() => {
    localStorage.setItem("branchId", branchId);
  }, [branchId]);
  useEffect(() => {
    if (branchName) {
      localStorage.setItem("branchName", branchName);
    }
  }, [branchName]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          year,
          setYear,
          branchId,
          setBranchId,
          branchName,
          setBranchName,
          years,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};
export const useGlobal = () => useContext(GlobalContext);
