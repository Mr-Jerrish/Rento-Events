import React, { useState } from "react";
import SigninLogo from "../images/image2.png";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../../utilis/api";

const slideLR = {
  initial: { x: "100vw", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 20, duration: 1.4 },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const res = await api.post("/auth/signin", payload);

      if (res.status === 200 && res.data.status === true) {
        toast.success(res.data.paramObjectsMap.message);

        const userData = res.data.paramObjectsMap.userData;
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));

        reset();
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.paramObjectsMap?.message || "Signin failed",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400">
      <motion.div
        variants={slideLR}
        initial="initial"
        animate="animate"
        exit="exit"
        className="rounded-xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden"
      >
        {/* Left Section */}
        <div className="bg-white flex flex-col justify-center items-center p-5">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <p className="text-gray-500 mb-6">
            Sign in to your account to continue
          </p>

          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <div className="flex items-center bg-white rounded-lg px-3 border focus-within:ring-2 focus-within:ring-blue-500">
                <Mail className="text-gray-800 w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full py-2 outline-none bg-transparent"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
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
              <div className="flex items-center bg-white rounded-lg px-3 border focus-within:ring-2 focus-within:ring-blue-500">
                <LockKeyhole className="text-gray-800 w-5 h-5 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full py-2 outline-none bg-transparent"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                />
                {showPassword ? (
                  <EyeOff
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="text-gray-500 w-5 h-5 cursor-pointer"
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

            {/* Change Password */}
            <div className="flex justify-end">
              <p
                className="text-blue-500 text-sm cursor-pointer hover:underline hover:font-bold"
                onClick={() => navigate("/changepassword")}
              >
                Change Password?
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className={`bg-blue-600 text-white font-bold py-2 rounded-xl w-full transition-all duration-300
              ${
                !isValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:scale-105"
              }`}
            >
              Signin
            </button>
          </form>

          <p className="mt-2 text-sm">
            Don't have an account?
            <span
              className="text-blue-600 cursor-pointer ml-1 hover:underline hover:font-bold"
              onClick={() => navigate("/")}
            >
              Signup
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center text-white p-5">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg mb-5">Sign in to your account to continue.</p>
          <img src={SigninLogo} alt="Logo" className="w-96 h-96 mx-auto" />
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
