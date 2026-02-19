import React from "react";
import { Home, LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
const Sidebar = ({ isOpen }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen pt-16
      bg-white/70 dark:bg-slate-800
      border-r border-slate-200 dark:border-slate-500  backdrop-blur-xl
      transition-all duration-300
      ${isOpen ? "w-40 md:w-52 px-1" : "w-14 px-2"}`}
      >
        <nav className="space-y-1">
          <SidebarItem
            icon={
              <LayoutDashboard className=" border-2 border-slate-300 p-1 rounded-full" />
            }
            text="Dashboard"
            to="/dashboard"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={
              <Users className="border-2 border-slate-300 p-1 rounded-full" />
            }
            text="Company Setup"
            to="companysetup"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={
              <Settings className="border-2 border-slate-300 p-1 rounded-full" />
            }
            text="Basic Master"
            to="BasicMaster"
            isOpen={isOpen}
          />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
