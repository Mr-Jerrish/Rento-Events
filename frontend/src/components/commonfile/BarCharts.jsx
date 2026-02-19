import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const BarCharts = () => {
  // 1️⃣ RAW DATA
  const monthlyPurchaseData = [
    {
      month: "Jan",
      twoWheeler: { count: 40, price: 75000 },
      threeWheeler: { count: 12, price: 180000 },
      fourWheeler: { count: 8, price: 650000 },
    },
    {
      month: "Feb",
      twoWheeler: { count: 55, price: 76000 },
      threeWheeler: { count: 15, price: 182000 },
      fourWheeler: { count: 10, price: 660000 },
    },
    {
      month: "Mar",
      twoWheeler: { count: 48, price: 75500 },
      threeWheeler: { count: 14, price: 181000 },
      fourWheeler: { count: 9, price: 655000 },
    },
  ];

  // 2️⃣ FLATTEN DATA FOR RECHARTS
  const chartData = monthlyPurchaseData.map((item) => {
    const twoWheelerExpense = item.twoWheeler.count * item.twoWheeler.price;
    const threeWheelerExpense =
      item.threeWheeler.count * item.threeWheeler.price;
    const fourWheelerExpense = item.fourWheeler.count * item.fourWheeler.price;

    return {
      month: item.month,

      twoWheelerCount: item.twoWheeler.count,
      threeWheelerCount: item.threeWheeler.count,
      fourWheelerCount: item.fourWheeler.count,

      twoWheelerExpense,
      threeWheelerExpense,
      fourWheelerExpense,
    };
  });

  // 3️⃣ CUSTOM TOOLTIP (COUNT + AMOUNT)
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;

    return (
      <div className="bg-white  p-3 rounded-lg shadow-lg text-sm">
        <p className="font-semibold mb-1">{label}</p>

        <p>🚲 Two Wheeler: {data.twoWheelerCount} units</p>
        <p>₹ {data.twoWheelerExpense.toLocaleString()}</p>

        <p className="mt-2">🛺 Three Wheeler: {data.threeWheelerCount} units</p>
        <p>₹ {data.threeWheelerExpense.toLocaleString()}</p>

        <p className="mt-2">🚗 Four Wheeler: {data.fourWheelerCount} units</p>
        <p>₹ {data.fourWheelerExpense.toLocaleString()}</p>
      </div>
    );
  };

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
      <h4 className="font-semibold mb-3 dark:text-white">
        Monthly Vehicle Purchase Expense
      </h4>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="month"
            stroke="var(--chart-text)"
            tick={{ fill: "var(--chart-text)", fontSize: 10 }}
          />
          <YAxis
            tickFormatter={(v) => `₹${v / 100000}L`}
            stroke="var(--chart-text)"
            tick={{ fill: "var(--chart-text)", fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="twoWheelerExpense"
            stackId="a"
            fill="#22c55e"
            name="Two Wheeler"
          />
          <Bar
            dataKey="threeWheelerExpense"
            stackId="a"
            fill="#f97316"
            name="Three Wheeler"
          />
          <Bar
            dataKey="fourWheelerExpense"
            stackId="a"
            fill="#3b82f6"
            name="Four Wheeler"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default BarCharts;
