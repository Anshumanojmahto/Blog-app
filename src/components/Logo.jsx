import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <img
        className="w-20 h-10 bg-white rounded-full"
        src="./logo.png"
        alt=""
      />
    </div>
  );
};

export default Logo;
