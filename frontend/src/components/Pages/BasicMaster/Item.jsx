import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../../commonfile/Card";
import {
  MapPin,
  Building2,
  CheckCircle,
  XCircle,
  Plus,
  X,
  ArrowLeft,
  Car,
  Package,
} from "lucide-react";
import CommonListView from "../../commonfile/CommonListView";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import api from "../../../utilis/api";
import { useNavigate } from "react-router-dom";

const Item = () => {
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
      itemCode: "",
      itemName: "",
      itemType: "",
      category: "",
      qty: 0,
      rent: 0,
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
        `/master/createItem?orgId=${orgId}&branchId=${branchId}`,
        data,
      );
      toast.success(res.data.paramObjectsMap.message);
      await fetchCurrentCode();
      reset({
        // itemCode: "",
        itemName: "",
        itemType: "",
        category: "",
        qty: 0,
        rent: 0,
        status: "Active",
      });
      setEdit(null);
      setOpenDialog(false);

      // getAll(page);
    } catch (err) {
      toast.error(err?.response?.data?.paramObjectsMap?.message || "Failed");
    } finally {
      SetLoading(false);
    }
  };

  const AddNew = async () => {
    setOpenDialog(true);
    reset({
      itemCode: "",
      itemName: "",
      itemType: "",
      category: "",
      qty: 0,
      rent: 0,
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
        `/master/getAllItems?orgId=${orgId}&branchId=${branchId}&page=${pageNo}&limit=${limit}`,
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
        `/master/getItemById/${_id}?orgId=${orgId}&branchId=${branchId}`,
      );
      const data = res.data.paramObjectsMap.data;
      setEdit(data);
      setOpenDialog(true);
      reset({
        itemCode: data.itemCode,
        itemName: data.itemName,
        itemType: data.itemType,
        category: data.category,
        qty: data.qty,
        rent: data.rent,
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
    { label: "Item Code", key: "itemCode", searchable: true },
    { label: "Item Name", key: "itemName", searchable: true },
    { label: "Item Type", key: "itemType", searchable: true },
    { label: "Category", key: "category", searchable: true },
    // { label: "Qty", key: "qty", searchable: true },
    { label: "Rent", key: "rent", searchable: true },
    { label: "Status", key: "status", type: "status" },
    { label: "Action", key: "action" },
  ];

  const fetchCurrentCode = async () => {
    const res = await api.get(
      `/master/generateCode?orgId=${orgId}&branchId=${branchId}`,
    );
    const code = res.data.paramObjectsMap.data;
    setValue("itemCode", code);
  };

  return (
    <>
      <h3 className="text-md font-semibold tracking-wide dark:text-slate-100 mb-1">
        Item
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
          title="Total Item"
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
                  <div className="p-1.5 rounded-lg bg-blue-600">
                    <Package className="w-4 h-4 text-white" />
                  </div>

                  {/* Gradient Title */}
                  <h2
                    className="
        text-lg font-semibold
        bg-gradient-to-r from-blue-500 to-purple-600
        bg-clip-text text-transparent
      "
                  >
                    Item Details
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-slate-800 dark:text-slate-400">
                  Manage all vehicle categories and classifications used across
                  your system
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
                {/* Item Code */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Item Code*
                  </label>
                  <input
                    type="text"
                    disabled
                    {...register("itemCode", {})}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Item Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Item Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chair"
                    {...register("itemName", {
                      required: "Item Name is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.itemName?.message}
                  </p>
                </div>

                {/* Item Type */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Item Type*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Plastic"
                    {...register("itemType", {
                      required: "Item Type is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.itemType?.message}
                  </p>
                </div>
                {/* Category */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Category*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Furniture"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category?.message}
                  </p>
                </div>

                {/* qty */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Quantity*
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    {...register("qty", {
                      required: "Quantity is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.qty?.message}
                  </p>
                </div>

                {/* rent */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Rent Price/Day*
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    {...register("rent", {
                      required: "Rent Price/Day is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rent?.message}
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

export default Item;
