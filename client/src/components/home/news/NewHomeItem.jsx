import Image from "next/image";
import React from "react";
import da_nang from "@/assets/images/area-motel-room/da_nang.jpg";
import { useRouter } from "next/router";
import { strToSlug } from "utils/common";
import { formatDate } from "utils/moment";
export default function NewHomeItem({ item }) {
  const router = useRouter();

  const handleClick = () => {
    const slug = strToSlug(item.title);
    router.push(`/new/${slug}-${item.id}`);
  };
  return (
    <div
      className="md:grid grid-cols-3 lg:space-x-5 md:space-x-3 lg:py-4 pb-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className={`relative lg:h-[150px] md:h-[120px] h-[180px] `}>
        <Image
          alt={item.title}
          src={item.thumbnail}
          placeholder={"blur"}
          blurDataURL={item.thumbnail}
          layout={"fill"}
          className={"rounded-lg"}
          objectFit={"cover"}
        />
        <div className="absolute right-1.5 bottom-1.5 text-white bg-primary rounded-md p-1 text-xs">
          <div className="max-w-[200px] line-clamp-1">{item.category.name}</div>
        </div>
      </div>
      <div className="col-span-2 my-2 md:my-0">
        <div className="text-sm mb-1">{formatDate(item.createdAt)}</div>
        <h2 className="m-0 text-info lg:text-xl text-[16px] line-clamp-2">
          {item.title}
        </h2>
        <p className="leading-6 text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}
