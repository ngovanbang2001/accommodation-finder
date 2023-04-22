import * as React from "react";
export default function TitleSection({
  title,
  className = "",
  isColorWhite = false,
}) {
  return (
    <div className={`${className} pb-4 flex justify-center`}>
      <div className="flex flex-col items-center space-y-4">
        <h2
          className={`font-bold m-0 lg:text-2xl text-xl ${
            isColorWhite ? "text-white" : ""
          }`}
        >
          {title}
        </h2>
        <div className="bg-primary h-[6px] w-[80px]"></div>
      </div>
    </div>
  );
}
