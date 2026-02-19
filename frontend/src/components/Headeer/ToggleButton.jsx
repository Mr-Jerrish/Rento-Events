import React from "react";
import { Menu } from "lucide-react";

const ToggleButton = ({ onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="
        p-2 rounded-full
        border border-slate-300 dark:border-slate-400
        text-slate-700 dark:text-slate-100
        bg-white dark:bg-slate-800

        shadow-md
        hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]
        hover:border-indigo-500
        hover:text-indigo-600 dark:hover:text-indigo-400

        hover:scale-110
        transition-all duration-300 ease-out
        focus:outline-none
      "
    >
      <Menu size={14} />
    </button>
  );
};

export default ToggleButton;
