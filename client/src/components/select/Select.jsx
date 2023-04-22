import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { Controller } from "react-hook-form";
const MySelect = ({
  options,
  control,
  name,
  placeholder,
  error,
  value: valueProp,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Fragment>
      {isClient && (
        <Controller
          control={control}
          render={({ field: { onChange, value, name, ref } }) => {
            return (
              <Fragment>
                <Select
                  inputRef={ref}
                  options={options}
                  name={name}
                  value={valueProp}
                  placeholder={placeholder}
                  onChange={(option) => {
                    onChange(option);
                  }}
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 1000,
                      background: "#ffff",
                      color: "#000",
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      padding: "5.5px 0",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderRadius: "8px",
                      borderColor: error?.length > 0 ? "#ef4444" : "#e5e7eb",
                      position: "relative",
                    }),
                  }}
                />
                <div className="h-[16px]">
                  {error?.length > 0 && (
                    <span className="text-red-500 mt-1 text-sm font-normal">
                      {error}
                    </span>
                  )}
                </div>
              </Fragment>
            );
          }}
          name={name}
        />
      )}
    </Fragment>
  );
};
MySelect.protoTypes = {
  options: PropTypes.object,
};
export default MySelect;
