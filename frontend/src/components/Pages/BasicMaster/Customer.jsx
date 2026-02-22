import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../../commonfile/Card";
import {
  CheckCircle,
  XCircle,
  Plus,
  X,
  ArrowLeft,
  Package,
  Users,
} from "lucide-react";
import CommonListView from "../../commonfile/CommonListView";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import api from "../../../utilis/api";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      customerCode: "",
      customerName: "",
      mobileNo: "",
      address: "",
      city: "",
      aadharNo: "",
      refName: "",
      refMobileNo: "",
      status: "Active",
    },
  });

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [getAllData, setGetAllData] = useState([]);
  const [edit, setEdit] = useState(null);
  const orgId = localStorage.getItem("orgId");
  const branchId = localStorage.getItem("branchId");

  const onSubmit = async (data) => {
    try {
      SetLoading(true);
      if (edit && edit._id) {
        data.id = edit._id;
      }
      const res = await api.put(
        `/master/createCustomer?orgId=${orgId}&branchId=${branchId}`,
        data,
      );
      toast.success(res.data.paramObjectsMap.message);
      await fetchCurrentCode();
      reset({
        customerName: "",
        mobileNo: "",
        address: "",
        city: "",
        aadharNo: "",
        refName: "",
        refMobileNo: "",
        status: "Active",
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

  const AddNew = async () => {
    setOpenDialog(true);
    reset({
      customerCode: "",
      customerName: "",
      mobileNo: "",
      address: "",
      city: "",
      aadharNo: "",
      refName: "",
      refMobileNo: "",
      status: "Active",
    });
    setEdit(null);
    await fetchCurrentCode();
  };

  const back = () => {
    navigate("/dashboard/BasicMaster");
  };

  const getAll = async (pageNo) => {
    try {
      const res = await api.get(
        `/master/getAllCustomer?orgId=${orgId}&branchId=${branchId}&page=${pageNo}&limit=${limit}`,
      );
      const apiData = res.data.paramObjectsMap.data;
      console.log(apiData);
      setGetAllData(apiData);
      setTotalPages(Math.ceil(apiData.totalCount / 5));
    } catch (err) {
      console.log(err);
    }
  };

  const getByid = async (_id) => {
    console.log("ID:", _id);
    try {
      const res = await api.get(
        `/master/getCustomerById/${_id}?orgId=${orgId}&branchId=${branchId}`,
      );
      const data = res.data.paramObjectsMap.data;
      setEdit(data);
      setOpenDialog(true);
      reset({
        customerCode: data.customerCode,
        customerName: data.customerName,
        mobileNo: data.mobileNo,
        address: data.address,
        city: data.city,
        aadharNo: data.aadharNo,
        refName: data.refName,
        refMobileNo: data.refMobileNo,
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
    { label: "Customer Code", key: "customerCode", searchable: true },
    { label: "Customer Name", key: "customerName", searchable: true },
    { label: "Mobile No", key: "mobileNo", searchable: true },
    { label: "Address", key: "address", searchable: true },
    { label: "City", key: "city", searchable: true },
    { label: "Status", key: "status", type: "status" },
    { label: "Action", key: "action" },
  ];

  const fetchCurrentCode = async () => {
    const res = await api.get(
      `/master/getCustomerCode?orgId=${orgId}&branchId=${branchId}`,
    );
    const code = res.data.paramObjectsMap.data;
    setValue("customerCode", code);
  };

  return (
    <>
      <h3 className="text-md font-semibold tracking-wide dark:text-slate-100 mb-1">
        Customer
      </h3>
      <div className="flex justify-end gap-2 mb-2">
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
          New
        </button>
        <button
          className="
      flex items-center gap-2
      px-2 py-1
      rounded-xl
      bg-gradient-to-r from-blue-500 to-cyan-500
      text-white text-sm font-semibold
      hover:scale-105
      transition-all duration-300
    "
          onClick={back}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>
      <div className="mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Total Customer"
          value={getAllData.totalCount}
          icon={Users}
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
                  <div className="p-1.5 rounded-lg bg-blue-600">
                    <Users className="w-4 h-4 text-white" />
                  </div>

                  {/* Gradient Title */}
                  <h2
                    className="
        text-lg font-semibold
        bg-gradient-to-r from-blue-500 to-purple-600
        bg-clip-text text-transparent
      "
                  >
                    Customer Details
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-slate-800 dark:text-slate-400">
                  Manage all your customers, their details, and contact
                  information used across your rental system
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
                {/*   Customer Code */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Customer Code*
                  </label>
                  <input
                    type="text"
                    disabled
                    {...register("customerCode", {})}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Customer Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Customer Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sheik"
                    {...register("customerName", {
                      required: "Customer Name is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerName?.message}
                  </p>
                </div>

                {/* Mobile No */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Mobile No*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9629295177"
                    {...register("mobileNo", {
                      required: "Mobile No is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid 10 digit mobile no",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileNo?.message}
                  </p>
                </div>
                {/* address */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Address*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. South Street"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address?.message}
                  </p>
                </div>

                {/* city */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    City*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Natham"
                    {...register("city", {
                      required: "City is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city?.message}
                  </p>
                </div>

                {/* Aadhar No */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Aadhar No
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enter 12-digit Aadhar No"
                    {...register("aadharNo", {
                      pattern: {
                        value: /^[0-9]{12}$/,
                        message: "Aadhar number must be 12 digits",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.aadharNo?.message}
                  </p>
                </div>
                {/*ref name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Ref Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mohamed"
                    {...register("refName")}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/*ref mobilr no */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Ref Mobile No
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9486504027"
                    {...register("refMobileNo", {
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid 10 digit ref mobile number",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.refMobileNo?.message}
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

export default Customer;
