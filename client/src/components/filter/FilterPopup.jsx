import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRef } from "react";
import Popup from "reactjs-popup";
import ButtonPrimary from "../button/ButtonPrimary";

const FilterPopup = ({
  title,
  label,
  children,
  handleApply = () => {},
  handleDelte = () => {},
}) => {
  const ref = useRef();
  const router = useRouter();
  const close = () => {
    ref.current.close();
  };

  const checkActiveLabelFilter = (label) => {
    if (router.query) {
      return Object.keys(router.query).includes(label);
    }
  };

  const handleApplyFilter = () => {
    handleApply();
    ref.current.close();
  };
  return (
    <Popup
      ref={ref}
      trigger={(open) => (
        <div
          className={`px-4 py-2 border ${
            open ? "border-primary text-primary" : "border-gray-200"
          } rounded-lg w-fit cursor-pointer ${
            checkActiveLabelFilter(label)
              ? "bg-primary text-white"
              : " bg-base-100"
          }`}
        >
          <span className={`font-semibold`}>{title}</span>
        </div>
      )}
      position="bottom left"
      closeOnDocumentClick
    >
      {children}
      <div className="flex items-center justify-end space-x-2 py-4 border-t-[1px] border-t-gray-200">
        <span className="cursor-pointer text-black" onClick={close}>
          Hủy bỏ
        </span>
        <ButtonPrimary
          title="Áp dụng"
          className="w-[80px]"
          handleClick={handleApplyFilter}
        />
      </div>
    </Popup>
  );
};
export default FilterPopup;
