import React from "react";
import PropTypes from "prop-types";

const Label = ({ children, htmlFor = "", className, isRequired = true }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} font-semibold cursor-pointer`}
    >
      {children}
      {isRequired && <span className="text-sm text-red-500"> *</span>}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};

export default Label;
