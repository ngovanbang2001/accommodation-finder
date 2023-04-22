import * as React from "react";
export default function DetailInfoItem({ icon = "", children }) {
  return (
    <div className="flex items-baseline space-x-2 py-2">
      {icon && <div className={`${icon} text-colorIcon`}></div>}
      <div className={"text-info leading-5"}>{children}</div>
    </div>
  );
}
