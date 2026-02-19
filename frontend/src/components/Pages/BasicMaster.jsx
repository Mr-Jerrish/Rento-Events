import React from "react";
import {
  Settings,
  Factory,
  CarFront,
  Layers,
  IndianRupee,
  FileText,
  Boxes,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BasicMaster = () => {
  const navigate = useNavigate();
  const vehicleScreens = [
    {
      id: 1,
      screenName: "Item",
      url: "/dashboard/BasicMaster/Item",
      icon: Package,
      bg: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      screenName: "Brand",
      url: "/brand",
      icon: Factory,
      bg: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      screenName: "Model",
      url: "/model",
      icon: CarFront,
      bg: "from-emerald-500 to-teal-500",
    },
    {
      id: 4,
      screenName: "Variant",
      url: "/variant",
      icon: Layers,
      bg: "from-orange-500 to-amber-500",
    },
    {
      id: 5,
      screenName: "Price Master",
      url: "/price-master",
      icon: IndianRupee,
      bg: "from-green-500 to-lime-500",
    },
    {
      id: 6,
      screenName: "Vehicle Documents",
      url: "/vehicle-documents",
      icon: FileText,
      bg: "from-indigo-500 to-blue-500",
    },
    {
      id: 7,
      screenName: "Stock View",
      url: "/stock-view",
      icon: Boxes,
      bg: "from-rose-500 to-red-500",
    },
  ];

  const handleScreens = (url) => {
    navigate(url);
  };

  return (
    <>
      <h3 className="text-md font-semibold tracking-wide dark:text-slate-100 mb-1">
        Basic Master
      </h3>

      <div
        className="
    rounded-2xl border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    p-6 shadow-md
    transition-all duration-300
    hover:shadow-[0_0_28px_rgba(59,130,246,0.35)]
    dark:hover:shadow-[0_0_28px_rgba(168,85,247,0.35)]
  "
      >
        {/* Header */}

        <div className="flex flex-row items-center justify-center mb-4  gap-2">
          {/* Icon */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md p-2 rounded-lg">
            <Settings className="h-7 w-7 animate-bounce" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Basic Master
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Manage all essential rental configurations like items, categories,
              pricing, and units.
            </p>
          </h1>

          {/* Subtitle */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {vehicleScreens.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className={`group relative rounded-2xl p-[1px] bg-gradient-to-br hover:cursor-pointer ${item.bg}`}
                onClick={() => handleScreens(item.url)}
              >
                <div
                  className="
          flex flex-col items-center gap-2
          rounded-2xl bg-white dark:bg-slate-900
          px-2 py-4
          transition-all duration-300
          group-hover:scale-[1.06]
          group-hover:shadow-xl
        "
                >
                  <div
                    className={`
            flex h-9 w-9 items-center justify-center
            rounded-xl bg-gradient-to-br ${item.bg}
            text-white shadow-md
            transition-transform duration-300
            group-hover:rotate-6
          `}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 text-center leading-tight">
                    {item.screenName}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BasicMaster;
