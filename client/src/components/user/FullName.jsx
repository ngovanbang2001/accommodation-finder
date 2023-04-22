import * as React from "react";
export default function FullName({ fullName, className, children }) {
  return (
    <div className={"flex items-center space-x-2"}>
      <span className={`${className} font-bold`}>{fullName}</span>
      {children}
    </div>
  );
}
