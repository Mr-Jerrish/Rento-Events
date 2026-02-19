import React from "react";
import { IndianRupee, Boxes, ShoppingCart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const DashboardCards = () => {
  const stats = [
    {
      title: "Today Sales",
      value: "₹1,25,000",
      icon: IndianRupee,
      bgColor: "from-emerald-500 via-emerald-600 to-emerald-700",
      glow: "hover:shadow-emerald-500/40",
    },
    {
      title: "Total Stock",
      value: 42,
      icon: Boxes,
      bgColor: "from-indigo-500 via-indigo-600 to-indigo-700",
      glow: "hover:shadow-indigo-500/40",
    },
    {
      title: "This Month Purchase",
      value: "₹8,50,000",
      icon: ShoppingCart,
      bgColor: "from-sky-500 via-sky-600 to-sky-700",
      glow: "hover:shadow-sky-500/40",
    },
    {
      title: "This Month Profit",
      value: "₹95,000",
      icon: TrendingUp,
      bgColor: "from-violet-500 via-violet-600 to-violet-700",
      glow: "hover:shadow-violet-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`
              group
  relative h-28 rounded-2xl overflow-hidden
  bg-gradient-to-br ${item.bgColor}
  shadow-lg ${item.glow}
  p-2 text-white
`}
          >
            {/* Background circles */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute bottom-6 left-1/2 w-16 h-16 bg-white/10 rounded-full -translate-x-1/2" />

            {/* Top row */}
            <div className="relative rounded-2xl text-white">
              {/* Top section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Icon
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                  </div>

                  {/* Title */}
                  <p className="text-sm font-bold opacity-90">{item.title}</p>
                </div>
              </div>

              {/* Value */}
              <div className="mt-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {item.value}
                </h1>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
