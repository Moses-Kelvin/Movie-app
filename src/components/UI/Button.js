import React from "react";
import '../../styles/Button/Button.scss';

const Button = ({ children, className, handleClick, disabled }) => {

   return <button className={`button  ${className}`}
      disabled={disabled}
      onClick={handleClick}>
      {children}
   </button>
};

export default Button;