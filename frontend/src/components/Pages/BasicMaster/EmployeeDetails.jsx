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
import dayjs from "dayjs";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      employeeCode: "",
      employeeName: "",
      mobileNo: "",
      employeeEmail: "",
      address: "",
      city: "",
      role: "",
      aadharNo: "",
      joinDate: today,
      salary: 0,
      status: "Active",
      // bank Details
      bankName: "",
      accountName: "",
      accountNo: "",
      ifscCode: "",
      branchName: "",
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

      data.joinDate = new Date(data.joinDate);

      const res = await api.put(
        `/master/createEmployee?orgId=${orgId}&branchId=${branchId}`,
        data,
      );
      toast.success(res.data.paramObjectsMap.message);
      await fetchCurrentCode();
      reset({
        employeeName: "",
        mobileNo: "",
        employeeEmail: "",
        address: "",
        city: "",
        role: "",
        aadharNo: "",
        joinDate: today,
        salary: 0,
        status: "Active",
        bankName: "",
        accountName: "",
        accountNo: "",
        ifscCode: "",
        branchName: "",
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
      employeeCode: "",
      employeeName: "",
      employeeEmail: "",
      mobileNo: "",
      address: "",
      city: "",
      role: "",
      aadharNo: "",
      joinDate: today,
      salary: 0,
      status: "Active",
      bankName: "",
      accountName: "",
      accountNo: "",
      ifscCode: "",
      branchName: "",
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
        `/master/getAllEmployee?orgId=${orgId}&branchId=${branchId}&page=${pageNo}&limit=${limit}`,
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
        `/master/getEmployeeById/${_id}?orgId=${orgId}&branchId=${branchId}`,
      );
      const data = res.data.paramObjectsMap.data;
      setEdit(data);
      setOpenDialog(true);
      reset({
        employeeCode: data.employeeCode,
        employeeName: data.employeeName,
        employeeEmail: data.employeeEmail,
        mobileNo: data.mobileNo,
        address: data.address,
        city: data.city,
        role: data.role,
        aadharNo: data.aadharNo,
        // joinDate: data.joinDate,
        joinDate: dayjs(data.joinDate).format("YYYY-MM-DD"),
        salary: data.salary,
        status: data.status,
        bankName: data.bankName,
        accountName: data.accountName,
        accountNo: data.accountNo,
        ifscCode: data.ifscCode,
        branchName: data.branchName,
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAll(page);
  }, [page]);

  const columns = [
    { label: "Employee Code", key: "employeeCode", searchable: true },
    { label: "Employee Name", key: "employeeName", searchable: true },
    { label: "Mobile No", key: "mobileNo", searchable: true },
    { label: "Address", key: "address", searchable: true },
    { label: "City", key: "city", searchable: true },
    { label: "Join Date", key: "joinDate", type: "date" },
    { label: "Status", key: "status", type: "status" },
    { label: "Action", key: "action" },
  ];

  const fetchCurrentCode = async () => {
    const res = await api.get(
      `/master/getEmployeeCode?orgId=${orgId}&branchId=${branchId}`,
    );
    const code = res.data.paramObjectsMap.data;
    setValue("employeeCode", code);
  };

  return (
    <>
      <h3 className="text-md font-semibold tracking-wide dark:text-slate-100 mb-1">
        Employee
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
          title="Total Employee"
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
                    Employee & Bank Details
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-slate-800 dark:text-slate-400">
                  Manage all your employees, their personal details, job roles,
                  and contact information used across your rental system
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
                {/* Employee Code */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Employee Code*
                  </label>
                  <input
                    type="text"
                    disabled
                    {...register("employeeCode", {})}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Employee Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Employee Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sheik"
                    {...register("employeeName", {
                      required: "Employee Name is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.employeeName?.message}
                  </p>
                </div>

                {/* Employee Email */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Employee Email
                  </label>
                  <input
                    type="text"
                    placeholder="company@example.com"
                    {...register("employeeEmail", {
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.employeeEmail?.message}
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
                {/* role */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Role*
                  </label>
                  <select
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    {...register("role", { required: "Role is required" })}
                    defaultValue=""
                  >
                    <option value="">Select Owner</option>
                    <option value="Owner">Owner</option>
                    <option value="Manager">Manager</option>
                    <option value="Delivery Boy">Delivery Boy</option>
                    <option value="Driver">Driver</option>
                    <option value="Helper">Helper</option>
                    <option value="Store Keeper">Store Keeper</option>
                    <option value="Accountant">Accountant</option>
                  </select>
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role?.message}
                  </p>
                </div>
                {/* Aadhar No */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Aadhar No*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enter 12-digit Aadhar No"
                    {...register("aadharNo", {
                      required: "Aadhar No is required",
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
                {/* join Date */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Join Date*
                  </label>
                  <input
                    type="date"
                    {...register("joinDate", {
                      required: "Join Date is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.joinDate?.message}
                  </p>
                </div>

                {/* Salary */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Salary*
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    {...register("salary", {
                      required: "Salary is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary?.message}
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

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {/* Bank  Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Bank Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SBI"
                    {...register("bankName", {
                      required: "Bank Name is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bankName?.message}
                  </p>
                </div>

                {/* Account Holder  Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Account Holder Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kumar"
                    {...register("accountName", {
                      required: "Account Holder Name is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountName?.message}
                  </p>
                </div>

                {/* Account No */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Account No*
                  </label>
                  <input
                    type="text"
                    // inputMode="numeric"
                    maxLength={18}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter Bank Account Number"
                    {...register("accountNo", {
                      required: "Account Number is required",
                      minLength: {
                        value: 9,
                        message: "Minimum 9 digits required",
                      },
                      maxLength: {
                        value: 18,
                        message: "Maximum 18 digits allowed",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountNo?.message}
                  </p>
                </div>

                {/* IFSC Code */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    IFSC Code*
                  </label>
                  <input
                    type="text"
                    maxLength={11}
                    // inputMode="numeric"
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. SBIN0001234"
                    {...register("ifscCode", {
                      required: "Account Number is required",
                      pattern: {
                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: "Enter valid IFSC (Example: SBIN0001234)",
                      },
                    })}
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ifscCode?.message}
                  </p>
                </div>
                {/* Branch  Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Branch Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai Main"
                    {...register("branchName", {
                      required: "Branch Name is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.branchName?.message}
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

export default EmployeeDetails;
