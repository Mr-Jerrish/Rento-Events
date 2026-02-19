import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../../commonfile/Card";
import { MapPin, Building2, CheckCircle, XCircle, Plus, X } from "lucide-react";
import CommonListView from "../../commonfile/CommonListView";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import api from "../../../utilis/api";

const BranchDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      branchName: "",
      branchCode: "",
      managerName: "",
      email: "",
      mobileNo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      status: "Active",
    },
  });
  const selectedCity = watch("city");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [csc, setCsc] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [getAllData, setGetAllData] = useState([]);
  const [edit, setEdit] = useState(null);
  const orgId = localStorage.getItem("orgId");

  const onSubmit = async (data) => {
    console.log(data);

    try {
      SetLoading(true);
      if (edit && edit._id) {
        data.id = edit._id;
      }
      const res = await api.put(`/company/branch/?orgId=${orgId}`, data);
      toast.success(res.data.paramObjectsMap.message);
      reset({
        branchName: "",
        branchCode: "",
        managerName: "",
        email: "",
        mobileNo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        status: "",
      });
      setEdit(null);
      setOpenDialog(false);
      getAll(page);
    } catch (err) {
      toast.error(err?.response?.data?.paramObjectsMap?.message || "Failed");
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/company/cities");
        setCsc(res.data);
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    const cityData = csc.find((c) => c.city === selectedCity);

    if (cityData) {
      setValue("state", cityData.state);
      setValue("country", cityData.country);
    }
  }, [selectedCity, csc, setValue]);

  const AddNew = () => {
    setOpenDialog(true);
    reset({
      branchName: "",
      branchCode: "",
      managerName: "",
      email: "",
      mobileNo: "",
      address: "",
      city: "",
      state: "",
      country: "",
      status: "Active",
    });
    setEdit(null);
  };

  const getAll = async (pageNo) => {
    try {
      const res = await api.get(
        `/company/getAllBranchDetails?page=${pageNo}&limit=${limit}`,
      );

      const apiData = res.data.paramObjectsMap.data;
      console.log(apiData);
      setGetAllData(apiData);
      // setTotalPages(apiData.totalPages);
      setTotalPages(Math.ceil(apiData.totalCount / 5));
    } catch (err) {
      console.log(err);
    }
  };

  const getByid = async (_id) => {
    console.log("ID:", _id);
    try {
      const res = await api.get(`/company/getBranchDetailsById/${_id}`);
      const data = res.data.paramObjectsMap.data;
      setEdit(data);
      setOpenDialog(true);
      reset({
        branchName: data.branchName,
        branchCode: data.branchCode,
        managerName: data.managerName,
        email: data.email,
        mobileNo: data.mobileNo,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status,
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAll(page);
  }, [page]);

  const columns = [
    { label: "Branch Name", key: "branchName", searchable: true },
    { label: "Branch Code", key: "branchCode", searchable: true },
    { label: "Manager Name", key: "email", searchable: true },
    { label: "Mobile No", key: "mobileNo", searchable: true },
    { label: "City", key: "city", searchable: true },
    { label: "State", key: "state", searchable: true },
    { label: "Country", key: "country", searchable: true },
    { label: "Status", key: "status", type: "status" },
    { label: "Action", key: "action" },
  ];

  return (
    <>
      <div className="flex justify-end mb-2">
        <button
          className="
      flex items-center gap-2
      px-2 py-1
      rounded-xl
      bg-gradient-to-r from-indigo-500 to-purple-600
      text-white text-sm font-semibold
      hover:scale-105
      transition-all duration-300
    "
          onClick={AddNew}
        >
          <Plus size={18} />
          Add New
        </button>
      </div>
      <div className="mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Total Branch"
          value={getAllData.totalCount}
          icon={Building2}
          gradient="from-indigo-500 to-purple-600"
        />
        <Card
          title="Active"
          value={getAllData.activeCount}
          icon={CheckCircle}
          gradient="from-green-500 to-emerald-600"
        />
        <Card
          title="Inactive"
          value={getAllData.inactiveCount}
          icon={XCircle}
          gradient="from-red-500 to-pink-600"
        />
      </div>
      {/*  */}
      {openDialog && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 backdrop-blur-sm
          "
        >
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="
              w-10/12
              bg-white dark:bg-slate-900
              rounded-2xl
              shadow-xl
              p-3 
            "
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              {/* LEFT : TITLE */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  <div className="p-1.5 rounded-lg bg-green-600">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>

                  {/* Gradient Title */}
                  <h2
                    className="
        text-lg font-semibold
        bg-gradient-to-r from-blue-500 to-purple-600
        bg-clip-text text-transparent
      "
                  >
                    Branch Details
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-slate-800 dark:text-slate-400">
                  Manage all your company branches and locations
                </p>
              </div>

              {/* RIGHT : CLOSE BUTTON */}
              <button
                onClick={() => setOpenDialog(false)}
                className="
      p-2 rounded-full
      bg-slate-100/70 dark:bg-slate-800/60
      backdrop-blur-lg
      border border-slate-200/60 dark:border-slate-700/60
      text-slate-500 dark:text-slate-300
      hover:text-red-500
      hover:bg-red-100/60 dark:hover:bg-red-500/20
      hover:rotate-90 hover:scale-110
      transition-all duration-300
    "
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {/* branch Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Branch Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter branch name"
                    {...register("branchName", {
                      required: "Branch Name is required",
                      minLength: {
                        value: 3,
                        message: "Must be at least 3 letters",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.branchName?.message}
                  </p>
                </div>

                {/* branch code */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Branch Code*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CR001"
                    {...register("branchCode", {
                      required: "Branch Code is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.branchCode?.message}
                  </p>
                </div>

                {/* manager name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Manager Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enter manager Name"
                    {...register("managerName", {
                      required: "Manager Name is required",
                      minLength: {
                        value: 3,
                        message: "Must be at least 3 letters",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.managerName?.message}
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Email*
                  </label>
                  <input
                    type="text"
                    placeholder="company@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Mobile No */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Mobile No*
                  </label>
                  <input
                    type="text"
                    placeholder="9792921578"
                    {...register("mobileNo", {
                      required: "Mobile No is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid 10 digit mobile number",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileNo?.message}
                  </p>
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Address*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 letters",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address?.message}
                  </p>
                </div>

                {/* City */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    City*
                  </label>
                  <select
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    {...register("city", { required: "City is required" })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    {csc.map((city, index) => (
                      <option key={index} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city?.message}
                  </p>
                </div>

                {/* State */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    State*
                  </label>
                  <input
                    type="text"
                    {...register("state", { required: "State is required" })}
                    readOnly
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state?.message}
                  </p>
                </div>

                {/* Country */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Country*
                  </label>
                  <input
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    readOnly
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country?.message}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Status*
                  </label>
                  <select
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    {...register("status", { required: "Status is required" })}
                    defaultValue=""
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status?.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-0">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-2 py-1  bg-indigo-600 text-white font-bold text-sm rounded-lg   transition-all duration-300
              ${
                !isValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700 hover:scale-105"
              }`}
                >
                  {loading ? "loading..." : "Save"}
                </button>
              </div>
            </form>

            {/*  */}

            {/* Footer */}
          </motion.div>
        </div>
      )}
      {/*  */}
      {/* Common List View */}
      <CommonListView
        data={getAllData.list}
        onEdit={getByid}
        columns={columns}
        showStatus={true}
        showFromDate={false}
        showToDate={false}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default BranchDetails;
