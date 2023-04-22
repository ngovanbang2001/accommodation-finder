import Image from "next/image";
import * as React from "react";
import ButtonSecondary from "@/components/button/ButtonSecondary";
export default function BlogItem({ item, handleClick }) {
  return (
    <div className={"cursor-pointer"} onClick={handleClick}>
      <div className={"w-full h-[340px] relative"}>
        <Image
          src={item.thumbnail}
          layout={"fill"}
          objectFit={"cover"}
          className={"rounded-lg"}
          alt={item.title}
        />
      </div>
      <h2 className={"m-0 my-2 line-clamp-2 text-info"}>{item.title}</h2>
      <div
        className="line-clamp-3 !font-thin"
        dangerouslySetInnerHTML={{ __html: item.content }}
      ></div>
    </div>
  );
}
