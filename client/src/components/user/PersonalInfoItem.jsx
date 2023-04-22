import * as React from "react";
export default function PersonalInfoItem({ iconName, label }) {
  return (
    <div className="text-center">
      <span className="block">{label}</span>
      <i className={iconName}></i>
    </div>
  );
}
