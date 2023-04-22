import React from "react";
import PropTypes from "prop-types";
import { statusConfig } from "configs/configs";
const StatusLabel = ({ status, isActive }) => {
  const renderClass = (status) => {
    switch (status) {
      case 0: {
        return "bg-orange-100 text-orange-500 text-sm";
      }
      case 1: {
        return "bg-green-100 text-green-500 text-sm";
      }
      case 2: {
        return "bg-red-100 text-red-500 text-sm";
      }
      case 3: {
        return "bg-gray-200 text-gray-500 text-sm";
      }
    }
  };
  return (
    <div
      className={`p-1 ${
        isActive > 0
          ? renderClass(status)
          : "bg-gray-100 text-gray-500 text-sm p-1 rounded-lg"
      } rounded-lg text-sm`}
    >
      {isActive > 0 ? statusConfig[status] : "Đã ẩn"}
    </div>
  );
};

StatusLabel.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusLabel;
