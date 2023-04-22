import * as React from "react";
import { useRouter } from "next/router";
export function MenuItem({ title, icon, path }) {
  const router = useRouter();
  const handleClick = () => {
    if (path) {
      router.push(`${path}`);
    }
  };
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={handleClick}
    >
      {icon && (
        <div
          className={`w-[35px] h-[35px] bg-backgroundGray rounded-full flex items-center justify-center`}
        >
          <i className={`${icon} text-colorIconMenu text-lg`}></i>
        </div>
      )}
      <span className="font-semibold text-info">{title}</span>
    </div>
  );
}
