import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const VehicleStockPieChart = () => {
  const vehicleStockData = [
    { name: "🚲 Two Wheeler", value: 68, color: "#22c55e" },
    { name: "🛺 Three Wheeler", value: 24, color: "#f97316" },
    { name: "🚗 Four Wheeler", value: 32, color: "#3b82f6" },
  ];

  const totalVehicles = vehicleStockData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        bg-white/70 dark:bg-slate-700/60
        backdrop-blur-md
        border border-slate-200 dark:border-slate-500
        rounded-2xl p-4
        shadow-md
        hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]
         dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]
        transition-all
      "
    >
      <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
        Vehicle Stock Distribution
      </h4>

      {/* CHART */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={vehicleStockData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
            >
              {vehicleStockData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [`${value} Vehicles`, name]}
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                color: "var(--chart-text)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TOTAL */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Total Vehicles
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {totalVehicles}
          </h3>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-1 flex flex-wrap gap-1">
        {vehicleStockData.map((item, index) => (
          <div
            key={index}
            className="
              flex items-center justify-center gap-0
              px-1 py-1
              rounded-full
              bg-slate-100/70 dark:bg-slate-800/60
              text-xs sm:text-sm
            "
          >
            {/* <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: item.color }}
            /> */}
            <span className="text-slate-700 dark:text-slate-200 text-sm">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VehicleStockPieChart;
