import React from "react";
import DashboardCards from "../commonfile/DashboardCards";
import BarCharts from "../commonfile/BarCharts";
import PieCharts from "../commonfile/PieCharts";
import GraphChart from "../commonfile/GraphChart";

const Dashboard = () => {
  return (
    <>
      <h3 className="text-md font-semibold tracking-wide dark:text-slate-100 mb-1">
        Dashboard
      </h3>

      <DashboardCards />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <BarCharts />
        <PieCharts />
        <GraphChart />
      </div>
    </>
  );
};

export default Dashboard;
