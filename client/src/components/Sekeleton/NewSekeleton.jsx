import React from "react";

const NewSekeleton = () => {
  return (
    <div className="flex lg:space-x-5 space-x-3 lg:py-4 py-1 items-start">
      <div className="animate-pulse lg:w-[250px] lg:h-[150px] w-[200px] h-[90px] bg-slate-200 rounded-lg"></div>
      <div className={"w-full flex flex-col space-y-5"}>
        <div className="animate-pulse h-6 bg-slate-200 rounded-lg w-1/2"></div>
        <div className="animate-pulse h-6 bg-slate-200 rounded-lg w-1/2"></div>
      </div>
    </div>
  );
};

export default NewSekeleton;
