import React, { useState } from "react";
import SignupLogo from "../images/image1.png";
import { User, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../../utilis/api";
const slideLR = {
  initial: { x: "-100vw", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 18, duration: 1.4 },
  },
  exit: {
    x: "100vw",
    opacity: 0,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };

      const res = await api.post("/auth/signup", payload);

      if (res.status === 200 || res.status === 201) {
        toast.success("Account created successfully");
        reset();
        navigate("/signin");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-xl">
      <motion.div
        variants={slideLR}
        initial="initial"
        animate="animate"
        exit="exit"
        className="rounded-xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden"
      >
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center text-white p-5">
          <h1 className="text-4xl font-bold">Join Us Today!</h1>
          <p className="text-lg mb-5">Create your account to get started.</p>
          <img src={SignupLogo} alt="Logo" className="w-96 h-96" />
        </div>

        {/* Right Section */}
        <div className="bg-white flex flex-col justify-center items-center p-5">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-gray-500 mb-6">
            Start monitoring your wheel sensors today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
            <div className="flex flex-col gap-3">
              {/* Full Name */}
              <div>
                <div className="flex items-center px-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                  <User className="w-5 h-5 mr-2" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Full Name is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                    })}
                    className="w-full py-2 outline-none"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center px-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                  <Mail className="w-5 h-5 mr-2" />
                  <input
                    type="email"
                    placeholder="Email Address"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center px-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                  <LockKeyhole className="w-5 h-5 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    className="w-full py-2 outline-none"
                  />
                  {showPassword ? (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center px-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                  <LockKeyhole className="w-5 h-5 mr-2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                    className="w-full py-2 outline-none"
                  />
                  {showConfirmPassword ? (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer"
                      onClick={() => setShowConfirmPassword(true)}
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="bg-blue-600 text-white font-bold py-2 rounded-xl w-full hover:bg-blue-700 disabled:opacity-50 transition"
              >
                Signup
              </button>
            </div>
          </form>

          <p className="mt-2">
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

export default Signup;
