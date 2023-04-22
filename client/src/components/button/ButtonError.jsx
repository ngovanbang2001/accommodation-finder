import * as React from "react";
import PropTypes from "prop-types";
export default function ButtonError({
  iconName = "",
  title,
  isPrimary = true,
  sizeIcon = "lg",
  className = "",
  type = "button",
  handleClick = () => {},
  disabled = false,
}) {
  return (
    <button
      className={`btn h-fit p-0 m-0 flex items-center space-x-1 border hover:bg-white hover:border-red-500 border-red-500 ${className}`}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {iconName && <i className={`${iconName} text-${sizeIcon}`} />}
      <span className={`text-red-500 normal-case`}>{title}</span>
    </button>
  );
}

ButtonError.propTypes = {
  iconName: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  sizeIcon: PropTypes.string,
  type: PropTypes.string,
};
