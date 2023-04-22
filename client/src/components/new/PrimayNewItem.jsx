import React from "react";
import Image from "next/image";
import { formatDate } from "utils/moment";
import { useRouter } from "next/router";
import { strToSlug } from "utils/common";
const PrimayNewItem = ({ primary = false, item }) => {
  const router = useRouter();
  const handleDetail = () => {
    const slug = strToSlug(item.title);
    router.push(`/new/${slug}-${item.id}`);
  };
  return (
    <div
      onClick={handleDetail}
      className={` cursor-pointer ${
        primary
          ? "lg:h-[408px] md:h-[350px] h-[250px]"
          : "lg:h-[196px] md:h-[200px] h-[120px]"
      } relative`}
    >
      <Image alt="" src={item.thumbnail} layout={"fill"} objectFit={"cover"} />
      <div className="absolute bottom-0 flex flex-col space-y-1 md:p-4 p-2 bg-info text-white left-0 right-0">
        <span className="text-sm md:block hidden">
          {formatDate(item.createdAt)}
        </span>
        <span className="font-bold lg:text-xl line-clamp-2 text-sm">
          {item.title}
        </span>
        <div className="md:block hidden">
          {primary && (
            <p className="line-clamp-2 text-sm md:block hidden">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimayNewItem;
