import React from "react";

const HeaderPopupFilter = ({ setShow }) => {
  return (
    <div className="bg-primary px-4 py-3 flex items-center justify-center mb-4 sticky top-0">
      <span className="text-white font-bold flex-1 text-center text-lg">
        Bộ lọc
      </span>
      <i
        className="fa-regular fa-xmark text-white text-xl cursor-pointer"
        onClick={() => setShow(false)}
      ></i>
    </div>
  );
};

export default HeaderPopupFilter;
