import * as React from "react";
export default function SideBarItem({ className = "", active = false, item }) {
  return (
    <div
      className={`flex items-center gap-x-1 py-3 px-4 text-info cursor-pointer ${className} ${
        active
          ? "mr-3 flex items-center bg-blue-100 rounded-tr-lg rounded-br-lg font-bold border-l-[5px] border-primary"
          : "transition-all hover:translate-x-[20px] hover:text-primary hover:font-bold"
      }`}
    >
      <i className={`${item.icon} ${active ? "text-primary" : ""}`}></i>
      <div className={`flex-1 ${active ? "text-primary" : ""}`}>
        {item.title}
      </div>
    </div>
  );
}
