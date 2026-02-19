import { Outlet } from "react-router-dom";
import Header from "../components/Headeer/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";


const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />

      {/* MAIN CONTENT */}
      {/* <main
        className={`pt-0 p-4 transition-all duration-300 bg-slate-100 dark:bg-slate-800 min-h-screen
        ${isSidebarOpen ? "ml-[155px] md:ml-52" : "ml-14"}`}
      > */}
      <main
  className={`pt-[60px] p-4 transition-all duration-300
  bg-slate-100 dark:bg-slate-800 min-h-screen overflow-y-hidden
  ${isSidebarOpen ? "ml-[155px] md:ml-52" : "ml-14"}`}
>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;

