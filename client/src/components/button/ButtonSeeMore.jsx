import React from "react";

const ButtonSeeMore = ({ handleClick = () => {}, title = "Xem theem" }) => {
  return (
    <div
      className="text-sm mx-auto bg-primary w-[200px] flex items-center justify-center space-x-3 p-3 rounded-lg text-white font-bold cursor-pointer"
      onClick={handleClick}
    >
      <span>{title}</span>
    </div>
  );
};

export default ButtonSeeMore;
