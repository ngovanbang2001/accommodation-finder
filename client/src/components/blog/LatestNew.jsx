import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { strToSlug } from "utils/common";

const LatestNew = ({ item }) => {
  const router = useRouter();
  const handleDetail = () => {
    const slug = strToSlug(item.title);
    router.push(`/new/${slug}-${item.id}`);
  };
  return (
    <div
      className="flex items-start space-x-3 cursor-pointer"
      onClick={handleDetail}
    >
      <div className="relative w-[130px] h-[74px]">
        <Image
          alt="thumbnail"
          src={item.thumbnail}
          layout={"fill"}
          objectFit={"cover"}
          className={"rounded-lg"}
        />
      </div>
      <span className="font-bold text-sm line-clamp-2 flex-1">
        {item.title}
      </span>
    </div>
  );
};

export default LatestNew;
