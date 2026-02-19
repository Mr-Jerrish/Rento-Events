import React from "react";

const Tooltip = ({
  text,
  position = "top",
  children,
}) => {
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div className="relative inline-block group">
      {children}

      <span
        className={`
          absolute z-50
          ${positionClasses[position]}
          whitespace-nowrap
          rounded-md
          bg-slate-800 text-white text-xs
          px-2 py-1
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          scale-95 group-hover:scale-100
          pointer-events-none
        `}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
