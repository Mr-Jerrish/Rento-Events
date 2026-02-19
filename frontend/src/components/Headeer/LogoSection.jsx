import React from 'react'
import Logo from '../images/Efit.png'

const LogoSection = () => {
  return (
    <img 
      src={Logo} 
      alt="E-Fit Logo" 
      className="h-8 w-auto sm:h-10 object-cover" 
    />
  )
}

export default LogoSection