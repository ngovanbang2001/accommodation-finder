import * as React from "react";
import Image from "next/image";
export default function ServiceItem({ item }) {
  return (
    <div className="flex items-center space-x-3 hover:border-primary rounded-xl my-2 mx-3 md:mx-6">
      <div className="p-2 bg-base-200 rounded-full cursor-pointer w-fit">
        <div className="relative w-[30px] h-[30px]">
          <Image alt="icon" src={item.img} className="object-contain" />
        </div>
      </div>
      <div className="flex flex-col cursor-pointer">
        <span className="text-info text-sm group-hover:text-primary font-bold">
          {item.title}
        </span>
        {/* <span className="text-sm">1120 bài đăng</span> */}
      </div>
    </div>
  );
}
