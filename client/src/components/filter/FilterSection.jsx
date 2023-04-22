import { PostTypeAPI } from "apis/post-type";
import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
const FilterSection = ({
  handleSelectType,
  handleSelectCategory,
  handleSelectTradingForm,
  setKeyword,
  keyword,
  handleSearch,
}) => {
  // const postTypeOptions = [
  //   { value: 1, label: "Tin thường" },
  //   { value: 2, label: "Tin VIP" },
  //   { value: 3, label: "Tin S-VIP" },
  // ];

  const categoryOptions = [
    { value: 1, label: "Chung cư" },
    { value: 2, label: "Nhà ở" },
    { value: 3, label: "Văn phòng" },
    { value: 4, label: "Phòng trọ" },
  ];

  const tradingFormOptions = [
    { value: 2, label: "Bán" },
    { value: 1, label: "Cho thuê" },
    { value: 3, label: "Cần thuê" },
    { value: 4, label: "Tìm bạn ở ghép" },
  ];

  const handleSearchPost = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const [postTypeOptions, setPostTypeOptions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await PostTypeAPI.getPostTypes({ offset: 0, limit: 20 });
        if (res) {
          const data = res.postTypes.map((item) => ({
            value: item.id,
            label: item.title,
          }));
          setPostTypeOptions([...data]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="flex overflow-x-auto items-center lg:justify-end gap-x-3 py-6 px-1">
      <div className="flex-shrink-0">
        <form onSubmit={(e) => handleSearchPost(e)}>
          <div className="relative w-[300px]">
            <i className="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-2/4 left-3 z-10 text-gray-400 text-sm"></i>
            <input
              placeholder="Bất động sản bạn đang tìm kiếm?"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              className="w-full py-2.5 pl-[30px] pr-3 rounded-lg outline-none focus:border-2 focus:border-primary border border-gray-200 bg-base-100"
            />
          </div>
        </form>
      </div>
      <Select
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 1000,
            background: "#ffff",
            color: "#000",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: "5px 0",
            borderRadius: "8px",
            borderColor: "#e5e7eb",
            width: "200px",
          }),
        }}
        options={postTypeOptions}
        onChange={(option) => {
          handleSelectType(option);
        }}
        isSearchable
        placeholder={"Lọc theo loại tin"}
      />
      <Select
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 1000,
            background: "#ffff",
            color: "#000",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: "5px 0",
            borderRadius: "8px",
            borderColor: "#e5e7eb",
            width: "200px",
          }),
        }}
        options={categoryOptions}
        onChange={(option) => {
          handleSelectCategory(option);
        }}
        isSearchable
        placeholder={"Lọc theo danh mục"}
      />
      <Select
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 1000,
            background: "#ffff",
            color: "#000",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: "5px 0",
            borderRadius: "8px",
            borderColor: "#e5e7eb",
            width: "200px",
          }),
        }}
        options={tradingFormOptions}
        onChange={(option) => {
          handleSelectTradingForm(option);
        }}
        isSearchable
        placeholder={"Lọc theo hình thức"}
      />
    </div>
  );
};

export default FilterSection;
