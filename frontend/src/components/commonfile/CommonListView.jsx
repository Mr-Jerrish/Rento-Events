import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Upload,
  Download,
  ArrowRight,
  ArrowLeft,
  PencilIcon,
} from "lucide-react";
import NoData from "../commonfile/NoData";
import Tooltip from "../commonfile/Tooltip";
const CommonListView = ({
  data = [],
  columns = [],
  showStatus = true,
  showFromDate = true,
  showToDate = true,
  handleImport,
  handleExport,
  onEdit,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 🔹 Filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Global search
      const globalMatch = columns.some((col) => {
        if (!col.searchable) return false;
        const value = row[col.key];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      });
      // Status Filter
      const statusMatch = status ? row.status === status : true;
      // Date Filter
      const rowDate = row.date ? new Date(row.date) : null;
      const fromMatch = fromDate ? rowDate >= new Date(fromDate) : true;
      const toMatch = toDate ? rowDate <= new Date(toDate) : true;
      return globalMatch && statusMatch && fromMatch && toMatch;
    });
  }, [data, columns, search, status, fromDate, toDate]);
  const tableData = filteredData;
  return (
    <>
      {/* search bar */}
      <div
        className="
        w-full
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-2xl
        p-2
        shadow-sm
      "
      >
        {/* ================= HEADER BAR ================= */}
        <div
          className="
          flex flex-col gap-4
          lg:flex-row lg:items-center lg:justify-between
        "
        >
          {/* -------- LEFT SIDE : SEARCH & FILTERS -------- */}
          <div
            className="
            flex flex-col gap-3
            sm:flex-row sm:flex-wrap sm:items-center
          "
          >
            {/* 🔍 Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-3 h-3 w-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                w-full
                pl-9 pr-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              />
            </div>

            {/* 🔽 Status */}
            {showStatus && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                w-full sm:w-40
                px-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            )}

            {/* 📅 From Date */}
            {showFromDate && (
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="
                w-full sm:w-44
                px-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:[color-scheme:dark]
              "
              />
            )}

            {/* 📅 To Date */}
            {showToDate && (
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="
                w-full sm:w-44
                px-3 py-1
                rounded-lg
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:[color-scheme:dark]
              "
              />
            )}
          </div>

          {/* -------- RIGHT SIDE : ACTION BUTTONS -------- */}
          <div
            className="
            flex gap-3 
            justify-center md:justify-end
            flex-wrap
          "
          >
            <button
              onClick={handleImport}
              className="
              flex items-center gap-2
              px-3 py-1
              rounded-lg
              bg-blue-600 text-white
              hover:bg-blue-700
              transition
            "
            >
              <Upload size={16} />
              Import
            </button>

            <button
              onClick={handleExport}
              className="
              flex items-center gap-2
              px-3 py-1
              rounded-lg
              bg-emerald-600 text-white
              hover:bg-emerald-700
              transition
            "
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="w-full rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 mt-2 p-2">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            {/* Header */}
            <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-2 text-slate-700 dark:text-slate-200"
                      >
                        {col.key === "action" ? (
                          <Tooltip text="Edit" position="bottom">
                            <button
                              onClick={() => onEdit(row._id)}
                              className="
          flex items-center gap-1
          px-2 py-1
          text-xs font-medium
          rounded-lg
          bg-amber-500 text-white
          hover:bg-amber-600
          transition
        "
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </Tooltip>
                        ) : col.type === "status" ? (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${
            row[col.key] === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
                          >
                            ● {row[col.key]}
                          </span>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/*pagination  */}
      <div
        className="
        w-full
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-xl
        p-2 mt-1
        shadow-sm
      "
      >
        <div className="flex justify-center items-center gap-4">
          <Tooltip text="Previous" position="bottom">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="
    flex items-center gap-2
    px-3 py-1.5
    rounded-xl
    dark:bg-white/90 bg-slate-900
    text-sm font-medium
    disabled:opacity-40 disabled:cursor-not-allowed
  "
            >
              <ArrowLeft className="w-5 h-5 dark:text-slate-900 text-white" />
            </button>
          </Tooltip>

          <span
            className="
    px-3 py-1.5
    text-sm font-semibold tracking-wide
    bg-indigo-700
    text-white
    rounded-full
    select-none
  "
          >
            {/* Page {currentPage} of {totalPages || 1} */}
            {currentPage}
          </span>

          <Tooltip text="Next" position="bottom">
            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              disabled={currentPage >= totalPages || totalPages === 0}
              className="
    flex items-center gap-2
    px-3 py-1.5
    rounded-xl
    dark:bg-white/90 bg-slate-900
    text-sm font-medium
    disabled:opacity-40 disabled:cursor-not-allowed
  "
            >
              <ArrowRight className="w-5 h-5 dark:text-slate-900 text-white" />
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default CommonListView;
