import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  control,
  name,
  type = "text",
  error = "",
  children,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <div>
      <input
        id={name}
        autoComplete={"off"}
        type={type}
        {...rest}
        className={`w-full p-3 rounded-lg border  flex-1 outline-none focus:border-primary ${
          error.length > 0 ? "border border-red-500" : "border-gray-200"
        }`}
        {...field}
      />
      <div className="h-[24px]">
        {error.length > 0 && (
          <span className="text-red-500 mt-1 text-sm font-normal">{error}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
