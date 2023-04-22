import * as React from "react";
import PropTypes from "prop-types";
export default function ButtonPrimary({
  iconName = "",
  title,
  isPrimary = true,
  className = "",
  sizeIcon = "lg",
  type = "button",
  disabled = false,
  isLoading = false,
  handleClick = () => {},
}) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`btn h-fit p-0 m-0 group flex items-center space-x-1 outline-none ${
        isPrimary
          ? `outline-none border-none normal-case bg-primary hover:bg-primary ${className}`
          : `normal-case ${className} hover:bg-transparent bg-transparent border border-primary hover:border-primary`
      }`}
      type={type}
    >
      {iconName && <i className={`${iconName} text-${sizeIcon}`} />}
      {isLoading && <i class="fas fa-spinner fa-spin text-white"></i>}
      <span className={`${isPrimary ? "text-white" : "text-primary "}`}>
        {title}
      </span>
    </button>
  );
}

ButtonPrimary.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  className: PropTypes.string,
  sizeIcon: PropTypes.string,
  type: PropTypes.string,
  handleClick: PropTypes.func,
};
