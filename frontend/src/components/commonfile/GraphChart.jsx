import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const GraphChart = () => {
  const monthlySalesData = [
    { month: "Jan", sales: 850000 },
    { month: "Feb", sales: 920000 },
    { month: "Mar", sales: 880000 },
    { month: "Apr", sales: 1050000 },
    { month: "May", sales: 1180000 },
    { month: "Jun", sales: 1120000 },
    { month: "Jul", sales: 1250000 },
    { month: "Aug", sales: 1300000 },
    { month: "Sep", sales: 1450000 },
    { month: "Oct", sales: 1600000 },
    { month: "Nov", sales: 1750000 },
    { month: "Dec", sales: 1900000 },
  ];

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
      <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">
        Monthly Sales Growth
      </h4>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={monthlySalesData}>
          {/* <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" /> */}

          <XAxis
            dataKey="month"
            stroke="var(--chart-text)"
            tick={{ fill: "var(--chart-text)", fontSize: 10 }}
          />
          <YAxis
            stroke="var(--chart-text)"
            tick={{ fill: "var(--chart-text)", fontSize: 10 }}
          />

          {/* TOOLTIP */}
          <Tooltip
            formatter={(value) => `₹ ${Number(value).toLocaleString()}`}
            contentStyle={{
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}
            labelStyle={{ color: "--chart-text" }}
          />

          {/* LINE */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--chart-line)"
            strokeWidth={3}
            dot={{ r: 4, fill: "var(--chart-line)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default GraphChart;
