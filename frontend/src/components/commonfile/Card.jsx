export const Card = ({ title, value, icon: Icon, gradient }) => (
  // <div className={`p-4 rounded-xl text-white  bg-gradient-to-r ${gradient}`}>
  <div
    className={`
  p-4
  rounded-xl
  text-white
  bg-gradient-to-r ${gradient}
  border-l-[7px] 
  transition-all
`}
    // border-l-amber-400
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs opacity-90">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>

      <div className="bg-slate-50/20  backdrop-blur-lg rounded-full p-2">
        <Icon size={28} className="opacity-90" />
      </div>
    </div>
  </div>
);
