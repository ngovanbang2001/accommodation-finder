import { NewCategoryAPI } from "apis/new-category";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { strToSlug } from "utils/common";

const NewCategorySection = ({ categories }) => {
  const router = useRouter();
  const handleClickCategory = (item) => {
    console.log("item", item);
    const slug = strToSlug(item.name);
    router.replace(`/blog/${slug}-${item.id}`);
  };
  return (
    <div className="bg-blue-200 py-4 flex items-center justify-center space-x-10">
      {categories &&
        categories.map((item, index) => (
          <span
            className="font-bold cursor-pointer"
            key={index}
            onClick={() => handleClickCategory(item)}
          >
            {item.name}
          </span>
        ))}
    </div>
  );
};

export default NewCategorySection;
