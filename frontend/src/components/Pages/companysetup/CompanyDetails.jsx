import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../../commonfile/Card";
import {
  Building2,
  CheckCircle,
  XCircle,
  Plus,
  X,
  Eye,
  Upload,
  Trash2,
} from "lucide-react";
import CommonListView from "../../commonfile/CommonListView";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import api from "../../../utilis/api";

const CompanyDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      companyName: "",
      registrationNo: "",
      taxId: "",
      industry: "",
      establishedYear: "",
      email: "",
      mobileNo: "",
      website: "",
      address: "",
      city: "",
      state: "",
      country: "",
      status: "Active",
      logo: null,
    },
  });
  const selectedCity = watch("city");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [csc, setCsc] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [getAllData, setGetAllData] = useState([]);
  const [edit, setEdit] = useState(null);

  const onSubmit = async (data) => {
    try {
      SetLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "logo") {
          formData.append(key, data[key]);
        }
      });

      if (edit && edit._id) {
        formData.append("id", edit._id);
      }

      if (selectedFile) {
        formData.append("logo", selectedFile);
      }

      const res = await api.put("/company/createCompanyDetails", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.paramObjectsMap.message);
      // const companyId = res.data.paramObjectsMap.data._id;
      // localStorage.setItem("orgId", companyId);
      reset({
        companyName: "",
        registrationNo: "",
        taxId: "",
        industry: "",
        establishedYear: "",
        email: "",
        mobileNo: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        status: "Active",
        logo: null,
      });
      setEdit(null);
      setFileName("");
      setLogoPreview(null);
      setOpenDialog(false);
      setSelectedFile(null);
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
      companyName: "",
      registrationNo: "",
      taxId: "",
      industry: "",
      establishedYear: "",
      email: "",
      mobileNo: "",
      website: "",
      address: "",
      city: "",
      state: "",
      country: "",
      status: "Active",
      logo: null,
    });
    setFileName("");
    setLogoPreview(null);
    setSelectedFile(null);
    setEdit(null);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    setValue("logo", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setFileName(file.name);
    setLogoPreview(URL.createObjectURL(file));
  };

  const removeLogo = async () => {
    setSelectedFile(null);

    setValue("logo", null, {
      shouldValidate: true,
    });

    setLogoPreview(null);
    setFileName("");
    setShowPreview(false);
    const logoInput = document.getElementById("logo");
    if (logoInput) logoInput.value = "";
  };

  const getAll = async (pageNo) => {
    try {
      const res = await api.get(
        `/company/getAllCompanyDetails?page=${pageNo}&limit=${limit}`,
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
      const res = await api.get(`/company/getCompanyDetailsById/${_id}`);

      const data = res.data.paramObjectsMap.data;

      const logoUrl = data.logo
        ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${data.logo}`
        : null;

      setEdit(data);
      setOpenDialog(true);
      setLogoPreview(logoUrl);
      setSelectedFile(null);
      setFileName(data.logo || "");

      reset({
        companyName: data.companyName,
        registrationNo: data.registrationNo,
        taxId: data.taxId,
        industry: data.industry,
        establishedYear: data.establishedYear,
        email: data.email,
        mobileNo: data.mobileNo,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        status: data.status,
        logo: data.logo,
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAll(page);
  }, [page]);

  const columns = [
    { label: "Company Name", key: "companyName", searchable: true },
    { label: "Industry", key: "industry", searchable: true },
    { label: "Email", key: "email", searchable: true },
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
      <div className="mb-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <Card
          title="Total Companies"
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
                    <Building2 className="w-4 h-4 text-white" />
                  </div>

                  {/* Gradient Title */}
                  <h2
                    className="
        text-lg font-semibold
        bg-gradient-to-r from-blue-500 to-purple-600
        bg-clip-text text-transparent
      "
                  >
                    Company Details
                  </h2>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-slate-800 dark:text-slate-400">
                  Manage your company information and registration details
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
                {/* Company Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    {...register("companyName", {
                      required: "Company Name is required",
                      minLength: {
                        value: 3,
                        message: "Must be at least 3 letters",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName?.message}
                  </p>
                </div>

                {/* Registration No */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Registration No*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 123456789"
                    {...register("registrationNo", {
                      required: "Registration No is required",
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registrationNo?.message}
                  </p>
                </div>

                {/* Tax Id */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Tax Id*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 33ABCDE1234F1Z5"
                    {...register("taxId", { required: "Tax Id is required" })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.taxId?.message}
                  </p>
                </div>

                {/* Industry */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Industry
                  </label>
                  <select
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    {...register("industry")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      🏢 Select Industry
                    </option>
                    <option value="Technology">💻 Technology</option>
                    <option value="Finance">💰 Finance</option>
                    <option value="Healthcare">🏥 Healthcare</option>
                    <option value="Retail">🛒 Retail</option>
                    <option value="Manufacturing">🏭 Manufacturing</option>
                    <option value="Consulting">🧑‍💼 Consulting</option>
                    <option value="Others">📦 Others</option>
                  </select>
                </div>

                {/* Established Year */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Established Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2020"
                    {...register("establishedYear", {
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: "Enter valid 4 digit year",
                      },
                    })}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.establishedYear?.message}
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

                {/* Website */}
                <div className="flex flex-col">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Website
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.example.com"
                    {...register("website")}
                    className="w-full px-2 py-1 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.website?.message}
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

                {/* Logo Upload Section */}
                <div className="flex flex-col gap-0">
                  <label className="text-sm text-slate-800 dark:text-slate-300">
                    Logo*
                  </label>

                  <div className="flex items-center gap-2">
                    {/* Upload Button */}
                    <label
                      className="inline-flex items-center gap-2 px-2 py-1 border rounded-lg
                 dark:bg-slate-800 dark:border-slate-700 dark:text-white
                  cursor-pointer text-sm transition whitespace-nowrap"
                    >
                      <Upload size={16} />
                      Choose File
                      <input
                        type="hidden"
                        {...register("logo", { required: "Logo is required" })}
                      />
                      <input
                        id="logoInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </label>

                    {/* File name */}
                    {fileName && (
                      <>
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
                          {fileName}
                        </span>

                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => setShowPreview(true)}
                          className="flex items-center gap-1 px-2 py-1 text-xs
                        bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          <Eye size={14} />
                          Preview
                        </button>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="p-1 text-red-500 hover:text-red-700 transition"
                          title="Remove logo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {showPreview && logoPreview && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full max-w-sm shadow-lg"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Logo Preview {fileName}
                        </h3>

                        <button
                          onClick={() => setShowPreview(false)}
                          className="text-red-500 dark:bg-slate-900 bg-slate-300 p-2 rounded-full transition"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Image */}
                      <div className="flex justify-center">
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-48 h-48 object-contain rounded-lg border
          border-gray-200 dark:border-gray-600 bg-white"
                        />
                      </div>
                    </motion.div>
                  </div>
                )}
                {/*  */}
              </div>
              {/*  */}
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

export default CompanyDetails;
