import React from "react";
import { Controller } from "react-hook-form";
import Radio from "../input/Radio";

const SelectContainer = ({
  register,
  control,
  error,
  name,
  value,
  checked,
  label,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Radio control={control} name={name} value={value} checked={checked} />
      <label>{label}</label>
    </div>
  );
};

export default SelectContainer;
