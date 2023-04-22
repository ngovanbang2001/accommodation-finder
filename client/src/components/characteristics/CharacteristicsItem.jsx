import * as React from "react";
export default function CharacteristicsItem({ icon = "", children, className = "", }) {
    return (<div className={`flex space-x-1 items-center text-info ${className}`}>
      {icon && <i className={icon}></i>}
      <div>{children}</div>
    </div>);
}
