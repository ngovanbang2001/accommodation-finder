import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({
  control,
  name,
  error = "",
  placeholder,
  children,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div>
      <textarea
        control={control}
        name={"question"}
        {...field}
        className={`h-[120px] border rounded-lg p-4 outline-none focus:border-primary w-full ${
          error?.length > 0 ? "border-red-500" : "border-gray-200"
        }`}
        placeholder={
          placeholder
            ? placeholder
            : '"Tôi muốn biết quy trình cho thuê phòng trọ"'
        }
      ></textarea>
      {error.length > 0 && (
        <span className="text-red-500 mt-1 text-sm font-normal">{error}</span>
      )}
    </div>
  );
};

export default TextArea;
