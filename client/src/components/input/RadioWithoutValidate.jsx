import React from "react";
import PropTypes from "prop-types";
const RadioWithoutValidate = ({ ...props }) => {
  return (
    <label className="custom-radio">
      <input
        type={"radio"}
        {...props}
        className={"hidden"}
        checked={props.checked}
      />
      <div className="w-full h-full bg-gray-200 rounded-full cursor-pointer "></div>
    </label>
  );
};

RadioWithoutValidate.propTypes = {
  checked: PropTypes.bool.isRequired,
};
export default RadioWithoutValidate;
