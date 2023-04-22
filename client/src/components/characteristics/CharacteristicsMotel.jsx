import {
  furnitureConfig,
  privateToiletConfig,
  stayWithHostConfig,
  tradingConfig,
} from "configs/configs";
import React from "react";
import { formatPrice } from "utils/common";
import CharacteristicsContainer from "./CharacteristicsContainer";

const CharacteristicsMotel = ({ post }) => {
  return (
    <div className={"flex flex-col space-y-3"}>
      <div className="flex lg:flex-row flex-col lg:space-x-4 items-center justify-center space-y-3 lg:space-y-0">
        <CharacteristicsContainer
          label={"Hình thức"}
          value={tradingConfig[post.tradingForm]}
          icon={"fa-regular fa-circle-star"}
        />
        <CharacteristicsContainer
          label={"Diện tích"}
          value={post.area}
          icon={"fa-regular fa-up-right-and-down-left-from-center text-sm"}
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:space-x-4 items-center justify-center space-y-3 lg:space-y-0">
        <CharacteristicsContainer
          label={"Tiền cọc"}
          value={`${post.deposit ? formatPrice(post.deposit) : 0} đ`}
          icon={"fa-regular fa-sack-dollar text-sm"}
        />
        <CharacteristicsContainer
          label={"Chung chủ"}
          icon={"fa-regular fa-loveseat"}
          value={
            stayWithHostConfig[post.isStayWithHost]
              ? stayWithHostConfig[post.isStayWithHost]
              : "Chưa xác định"
          }
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
          label={"Vệ sinh"}
          icon={"fa-regular fa-loveseat"}
          value={
            privateToiletConfig[post.isPrivateToilet]
              ? privateToiletConfig[post.isPrivateToilet]
              : "Chưa xác định"
          }
        />
      </div>
    </div>
  );
};

export default CharacteristicsMotel;
