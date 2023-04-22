import {
  furnitureConfig,
  privateToiletConfig,
  tradingConfig,
  tradingFormConfig,
} from "configs/configs";
import React from "react";
import CharacteristicsContainer from "./CharacteristicsContainer";

const CharacteristicsApartment = ({ post }) => {
  return (
    <div className={"flex flex-col space-y-3"}>
      <div className="flex lg:flex-row flex-col lg:space-x-4 items-center justify-center space-y-3 lg:space-y-0">
        <CharacteristicsContainer
          label={"Hình thức"}
          value={tradingConfig[post.tradingForm]}
          icon={"fa-regular fa-circle-star"}
        />
        <CharacteristicsContainer
          label={"Mã căn hộ"}
          value={post.apartmentCode ? post.apartmentCode : "Chưa xác định"}
          icon={"fa-regular fa-building"}
        />
        <CharacteristicsContainer
          label={"Tầng số"}
          value={post.floor ? post.floor : "Chưa xác định"}
          icon={"fa-regular fa-arrow-up-9-1"}
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:space-x-4 items-center justify-center space-y-3 lg:space-y-0">
        <CharacteristicsContainer
          label={"Diện tích"}
          value={post.area}
          icon={"fa-regular fa-up-right-and-down-left-from-center text-sm"}
        />
        <CharacteristicsContainer
          label={"Tình trạng nội thất"}
          icon={"fa-regular fa-loveseat"}
          value={
            furnitureConfig[post.isFurniture]
              ? furnitureConfig[post.isFurniture]
              : "Chưa xác định"
          }
        />
        <CharacteristicsContainer
          label={"Phòng vệ sinh"}
          icon={"fa-regular fa-toilet"}
          value={post.numberOfToilet}
        />
        <CharacteristicsContainer
          label={"Phòng ngủ"}
          icon={"fa-regular fa-loveseat"}
          value={post.numberOfBedrooms}
        />
      </div>
    </div>
  );
};

export default CharacteristicsApartment;
