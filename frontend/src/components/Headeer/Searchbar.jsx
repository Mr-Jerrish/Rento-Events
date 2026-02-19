import React from 'react'
import { Search } from 'lucide-react';
  // focus:outline-none focus:ring-2 focus:ring-violet-500
  // transition-colors duration-200
const Searchbar = () => {
  return (
   <>

     <div className="hidden sm:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 text-slate-100 w-8 h-8 p-1 rounded-full border-2 border-slate-300 bg-blue-600"  />
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-8 pr-4 py-1
              bg-white
              border border-gray-400
              dark:text-slate-900
              rounded-lg
              text-sm
              focus:outline-none 
            "
          />
        </div>
      </div>
    
  
   </>
  )
}

export default Searchbar

