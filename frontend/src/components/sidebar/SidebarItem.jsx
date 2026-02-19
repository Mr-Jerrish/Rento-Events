
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, text, isOpen, to}) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        group relative
        flex items-center gap-3 w-full px-1 rounded-full
        transition-all duration-300 ease-out
        ${
          isActive
            ? `
              bg-blue-700
              text-slate-100
              shadow-[0_0_18px_rgba(29,78,216,0.9)]
            `
            : `
               dark:text-slate-100
              hover:bg-blue-50
              dark:hover:bg-blue-900/40
              border border-transparent
              hover:scale-[1.03]
            `
        }
        `
      }
    >
      {/* ICON */}
      <span className={`p-1 rounded-full  transition group-hover:scale-110`}>
        {icon}
      </span>
     

      {/* TEXT */}
      {isOpen && (
        <span className="text-sm font-medium whitespace-nowrap">
          {text}
        </span>
      )}
    </NavLink>

   

  );
};

export default SidebarItem;




