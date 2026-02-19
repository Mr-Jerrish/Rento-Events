import React, { useState } from "react";
import SignupLogo from "../images/image3.png";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from '../../utilis/api'
const ChangePassword = () => {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
       const payload = {
        email:data.email,
        currentPassword:data.currentPassword,
        newPassword:data.newPassword,
        confirmPassword:data.confirmPassword
       };

       const res = await api.post("/auth/change-password",payload);
       if(res.status === 200 || res.status === 201){
        toast.success("Update Password Successfully")
        reset()
         navigate("/signin");
       }

    }catch(err){
         toast.error(err?.response?.data?.message || "Update failed"); 
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#115C48] via-[#209180] to-[#C591D3]">
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
        className="rounded-xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden"
      >
        {/* Left */}
        <div className="flex flex-col justify-center items-center text-white p-5">
          <h1 className="text-3xl font-bold">Change Your Password!</h1>
          <p className="mb-4">Update your account to get started</p>
          <img src={SignupLogo} alt="Logo" className="w-80 h-80" />
        </div>

        {/* Right */}
        <div className="bg-white flex flex-col justify-center items-center p-5">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <p className="text-gray-500 mb-4">Keep your account secure</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">

            {/* Email */}
            <div>
              <div className="flex items-center border rounded-lg px-3">
                <Mail className="w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full py-2 outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Current Password */}
            <div>
              <div className="flex items-center border rounded-lg px-3">
                <LockKeyhole className="w-5 h-5 mr-2" />
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current Password"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full py-2 outline-none"
                />
                {showCurrent ? (
                  <EyeOff onClick={() => setShowCurrent(false)} className="cursor-pointer" />
                ) : (
                  <Eye onClick={() => setShowCurrent(true)} className="cursor-pointer" />
                )}
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <div className="flex items-center border rounded-lg px-3">
                <LockKeyhole className="w-5 h-5 mr-2" />
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full py-2 outline-none"
                />
                {showNew ? (
                  <EyeOff onClick={() => setShowNew(false)} className="cursor-pointer" />
                ) : (
                  <Eye onClick={() => setShowNew(true)} className="cursor-pointer" />
                )}
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center border rounded-lg px-3">
                <LockKeyhole className="w-5 h-5 mr-2" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === newPasswordValue || "Passwords do not match",
                  })}
                  className="w-full py-2 outline-none"
                />
                {showConfirm ? (
                  <EyeOff onClick={() => setShowConfirm(false)} className="cursor-pointer" />
                ) : (
                  <Eye onClick={() => setShowConfirm(true)} className="cursor-pointer" />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              disabled={!isValid}
              className="bg-blue-600 text-white py-2 rounded-xl w-full hover:bg-blue-700 disabled:opacity-50"
            >
              Update Password
            </button>
          </form>

          <p className="mt-3">
            Already have an account?
            <span
              className="text-blue-600 cursor-pointer ml-1"
              onClick={() => navigate("/signin")}
            >
              Signin
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
