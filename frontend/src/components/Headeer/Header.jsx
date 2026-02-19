import React from "react";
import LogoSection from "./LogoSection";
import ToggleButton from "./ToggleButton";
import Searchbar from "./Searchbar";
import ComapnyLogo from "./ComapnyLogo";
import DarkMode from "./DarkMode";
import Notification from "./Notification";
import Users from "./Users";
import Global from './Global'

const Header = ({ onToggle }) => {
  return (
   
      <header className="w-full bg-slate-100/70 dark:bg-slate-800 backdrop-blur-md border-b border-slate-200 dark:border-slate-600 px-3 py-1 fixed top-0 left-0 z-40">

      <div className="flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-10 md:gap-20">
         
          <LogoSection />
          <ToggleButton onToggle={onToggle} />

          {/* Search only md & above */}
          <div className="hidden md:block">
            <Searchbar />
          </div>
        </div>

        {/* CENTER – Company logo (hidden on mobile) */}
        <div className="hidden lg:flex">
          <ComapnyLogo />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">
          <DarkMode />
          <Global />
          <Notification />
          <Users />
        </div>

      </div>
    </header>
  );
};

export default Header;
