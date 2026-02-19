import React, { useEffect, useRef, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Tooltip from "../commonfile/Tooltip";

const Users = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const loginUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!loginUser;

  /* 🕒 Date & Time State */
  const [dateTime, setDateTime] = useState(new Date());

  /* 🔁 Update time every second */
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

 
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 📅 Date Format */
  const formattedDate = dateTime.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* ⏱️ 24-Hour Time Format */
  const formattedTime = dateTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  /* 🚪 Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successful");
    navigate("/signin");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <Tooltip text="User Menu" position="bottom">
        <button
          onClick={() => setOpen(!open)}
          className="
            relative p-2 rounded-full
            border border-slate-300 dark:border-slate-400
            text-white
            bg-gradient-to-r from-indigo-500 to-purple-500
            shadow-md
            hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]
            hover:scale-110
            transition-all duration-300
          "
        >
          <User size={14} />

          {/* 🟢 Online Status */}
          {isLoggedIn && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          )}
        </button>
      </Tooltip>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-60
            rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
             shadow-[0_0_25px_rgba(59,130,246,0.35)]
            dark:shadow-[0_0_25px_rgba(168,85,247,0.35)]
            overflow-hidden
            animate-fadeIn
          "
        >
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="relative p-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
              <img
                src="https://i.pravatar.cc/50"
                alt="Avatar"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {loginUser?.fullName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-300 truncate">
                {loginUser?.email}
              </p>
            </div>
          </div>

          {/* 📅 Date & Time */}
          <div
            className="
              mx-4 mb-3 px-3 py-2 rounded-xl
              bg-gradient-to-r from-indigo-50 to-purple-50
              dark:from-slate-800 dark:to-slate-700
              border border-slate-200 dark:border-slate-600
              text-center
            "
          >
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {formattedDate}
            </p>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider">
              {formattedTime}
            </p>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-700 mx-4" />

          {/* Actions */}
          <button
            className="
              w-full flex items-center gap-2 px-4 py-2
              text-sm text-slate-700 dark:text-slate-200
              hover:bg-indigo-50 dark:hover:bg-slate-800
              transition
            "
          >
            <User size={16} />
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-2 px-4 py-2
              text-sm text-red-600
              hover:bg-red-50 dark:hover:bg-red-500/10
              transition
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;





