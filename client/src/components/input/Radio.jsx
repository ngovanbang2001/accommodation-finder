import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
const Radio = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
  });
  return (
    <label className="custom-radio">
      <input
        type={"radio"}
        {...field}
        {...props}
        className={"hidden"}
        checked={props.checked}
      />
      <div className="w-full h-full bg-gray-200 rounded-full cursor-pointer "></div>
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
};
export default Radio;
