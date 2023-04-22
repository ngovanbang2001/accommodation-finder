import React, { Fragment, useState } from "react";
import FilterPopup from "../pop-up/FilterPopup";

const FilterButton = () => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const handleShowFilterPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  };
  return (
    <div className=" lg:hidden flex justify-center w-full">
      <div
        className="flex items-center justify-center w-[250px] space-x-2 px-3 py-1 rounded-lg border border-gray-300 cursor-pointer"
        onClick={handleShowFilterPopup}
      >
        <i className="fa-regular fa-sliders"></i>
        <span>Bộ lọc</span>
      </div>
      <FilterPopup show={showFilterPopup} setShow={setShowFilterPopup} />
    </div>
  );
};

export default FilterButton;
