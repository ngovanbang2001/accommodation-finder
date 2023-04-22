import React from "react";

const FormGroup = ({ children, isMb = true }) => {
  return (
    <div className={`flex flex-col space-y-2 ${isMb ? "mb-4" : ""} `}>
      {children}
    </div>
  );
};

export default FormGroup;
