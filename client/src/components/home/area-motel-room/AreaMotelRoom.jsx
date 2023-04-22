import * as React from "react";
import Image from "next/image";
export default function AreaMotelRoom({ item }) {
  return (
    <div
      className={`relative w-[390px] h-[200px] md:col-span-1 rounded-xl overflow-hidden cursor-pointer [&:not(last)]:mr-2 `}
    >
      <Image
        alt=""
        src={item.img}
        layout={"fill"}
        className="object-cover hover:scale-[1.05] ease-out duration-300"
      />
      <div className="absolute left-0 bottom-5 w-full">
        <div className="flex flex-col w-10/12 mx-auto rounded-md justify-center py-1">
          <span className="font-bold lg:text-2xl text-xl text-white">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
}
