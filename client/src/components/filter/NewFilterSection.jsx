import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Select from "react-select";
import ButtonPrimary from "../button/ButtonPrimary";
const NewFilterSection = ({ setKeyword, keyword, handleSearch }) => {
  const router = useRouter();
  const handleSearchPost = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handleNavigateCreateNew = () => {
    router.push("new/create-new");
  };

  return (
    <div className="py-4">
      <div className="md:justify-end md:flex items-center md:gap-x-3">
        <form onSubmit={(e) => handleSearchPost(e)}>
          <div className="relative w-[300px]">
            <i className="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-2/4 left-3 z-10 text-gray-400 text-sm"></i>
            <input
              placeholder="Nhập từ khóa để tìm khóa"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              value={keyword}
              className="w-full py-2.5 pl-[30px] pr-3 rounded-lg outline-none focus:border-2 focus:border-primary border border-gray-200 bg-base-100"
            />
          </div>
        </form>
        <div className="md:mt-0 mt-2">
          <ButtonPrimary
            title="Tạo tin tức mới"
            className="w-[200px]"
            iconName="fa-regular fa-plus text-xs text-white"
            handleClick={handleNavigateCreateNew}
          />
        </div>
      </div>
    </div>
  );
};

export default NewFilterSection;
