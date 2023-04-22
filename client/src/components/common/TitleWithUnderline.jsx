import * as React from "react";
export default function TitleWithUnderLine({ title }) {
  return (
    <div className="w-fit">
      <div className="uppercase font-bold lg:text-xl text-lg mb-2 text-backgroundGray pt-4 lg:pt-0">
        {title}
      </div>
      <div className="h-[2px] w-full bg-primary"></div>
    </div>
  );
}
