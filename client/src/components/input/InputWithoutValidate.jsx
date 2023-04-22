import React from "react";

const InputWithoutValidate = ({ name, type = "text", ...rest }) => {
  return (
    <div>
      <input
        id={name}
        autoComplete={"off"}
        type={type}
        {...rest}
        className={`w-full p-3 rounded-lg border  flex-1 outline-none focus:border-primary border-gray-200`}
      />
      <div className="h-[24px]"></div>
    </div>
  );
};

export default InputWithoutValidate;
