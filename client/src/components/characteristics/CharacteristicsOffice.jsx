import {
  furnitureConfig,
  privateToiletConfig,
  tradingConfig,
  tradingFormConfig,
  typeHouse,
  typeOffice,
} from "configs/configs";
import React from "react";
import { formatPrice } from "utils/common";
import CharacteristicsContainer from "./CharacteristicsContainer";

const CharacteristicsOffice = ({ post }) => {
  return (
    <div className={"flex flex-col space-y-3"}>
      <div className="flex lg:flex-row flex-col lg:space-x-4 items-center justify-center space-y-3 lg:space-y-0">
        <CharacteristicsContainer
          label={"Hình thức"}
          value={tradingConfig[post.tradingForm]}
          icon={"fa-regular fa-circle-star"}
        />
        <CharacteristicsContainer
          label={"Loại hình văn phòng"}
          value={
            post.typeOfApartment
              ? typeOffice[post.typeOfApartment]
              : "Chưa xác định"
          }
          icon={"fa-regular fa-store"}
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:space-x-4 items-center justify-center space-y-3 lg:space-y-0">
        <CharacteristicsContainer
          label={"Diện tích"}
          value={post.area}
          icon={"fa-regular fa-up-right-and-down-left-from-center text-sm"}
        />
        <CharacteristicsContainer
          label={"Tên tòa nhà"}
          value={
            post.typeOfApartment
              ? typeHouse[post.typeOfApartment]
              : "Chưa xác định"
          }
          icon={"fa-regular fa-building"}
        />
        <CharacteristicsContainer
          label={"Tầng số"}
          icon={"fa-regular fa-arrow-up-9-1"}
          value={post.floor ? post.floor : "Chưa xác định"}
        />
        <CharacteristicsContainer
          label={"Tiền cọc"}
          value={`${post.deposit ? formatPrice(post.deposit) : 0} đ`}
          icon={"fa-regular fa-sack-dollar text-sm"}
        />
      </div>
    </div>
  );
};

export default CharacteristicsOffice;
