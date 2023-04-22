import CharacteristicsItem from "@/components/characteristics/CharacteristicsItem";
import Dot from "@/components/common/Dot";
import UserInfo from "@/components/user/UserInfo";
import {
  districtsConfig,
  furnitureConfig,
  privateToiletConfig,
  provincesConfig,
  stayWithHostConfig,
  typeHouse,
  typeOffice,
  typeOfApartment,
} from "configs/configs";
import React, { Fragment } from "react";
import { formatPrice, getTradingForm } from "utils/common";
import { formatDate } from "utils/moment";
import TitlePostItem from "../TitlePostItem";

const PostInfo = ({ item, showTitle = true }) => {
  return (
    <div>
      {item.tradingForm !== 3 ? (
        <div className={`${showTitle ? "p-4" : ""}`}>
          {showTitle && (
            <Fragment>
              <div className="pb-2 flex items-center space-x-1 text-primary font-bold">
                <span className="text-2xl line-clamp-1">
                  {formatPrice(item.price)}
                  <span className="text-xl">&#8363;</span>
                  <span className="text-sm"> / tháng</span>
                </span>
              </div>
              <TitlePostItem
                className={"font-bold text-info flex items-center h-[50px]"}
              >
                <span> {item.title}</span>
              </TitlePostItem>
              <CharacteristicsItem
                icon={"fa-regular fa-location-dot"}
                className={"py-2"}
              >
                <span className="text-sm line-clamp-1">
                  {districtsConfig[item.district]},{" "}
                  {provincesConfig[item.province]}
                </span>
              </CharacteristicsItem>
            </Fragment>
          )}
          {item.category === 4 && (
            <div className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
              <div className="flex items-center space-x-5">
                <CharacteristicsItem
                  icon={"fa-regular fa-up-right-and-down-left-from-center"}
                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-loveseat"}>
                  <span className="line-clamp-1">
                    {furnitureConfig[item.isFurniture]}
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-toilet"}>
                  <span className="line-clamp-1">
                    {privateToiletConfig[item.isPrivateToilet]}
                  </span>
                </CharacteristicsItem>
              </div>
              <div className="flex items-center space-x-3">
                <CharacteristicsItem icon={"fa-regular fa-people-group"}>
                  <span className="line-clamp-1">
                    {stayWithHostConfig[item.isStayWithHost]}
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                  <span className="line-clamp-1">
                    {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                    <span>&#8363;</span>
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <div className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center">
                  <span className="text-xs text-white line-clamp-1">
                    {getTradingForm(item.tradingForm)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {item.category === 3 && (
            <div className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
              <div className="flex items-center space-x-5">
                <CharacteristicsItem
                  icon={"fa-regular fa-up-right-and-down-left-from-center"}
                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-shop"}>
                  <span className="line-clamp-1">
                    {typeOffice[item.typeOfApartment]}
                  </span>
                </CharacteristicsItem>
              </div>
              <div className="flex items-center space-x-3">
                <CharacteristicsItem icon={"fa-regular fa-arrow-up-9-1"}>
                  <span className="line-clamp-1">
                    {item.floor ? item.floor : <span>&#934;</span>}
                  </span>
                </CharacteristicsItem>
                {item.tradingForm === 1 && (
                  <Fragment>
                    <Dot className="w-[4px] h-[4px] bg-gray-300" />
                    <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                      <span className="line-clamp-1">
                        {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                        <span>&#8363;</span>
                      </span>
                    </CharacteristicsItem>
                  </Fragment>
                )}
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <div className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center">
                  <span className="text-xs text-white line-clamp-1">
                    {getTradingForm(item.tradingForm)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {item.category === 2 && (
            <div className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
              <div className="flex items-center space-x-5">
                <CharacteristicsItem
                  icon={"fa-regular fa-up-right-and-down-left-from-center"}
                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-loveseat"}>
                  <span className="line-clamp-1">
                    {typeHouse[item.typeOfApartment]}
                  </span>
                </CharacteristicsItem>

                {item.category === 1 && (
                  <Fragment>
                    <Dot className="w-[4px] h-[4px] bg-gray-300" />
                    <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                      <span className="line-clamp-1">
                        {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                        <span>&#8363;</span>
                      </span>
                    </CharacteristicsItem>
                  </Fragment>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <CharacteristicsItem icon={"fa-regular fa-bed"}>
                  <span className="line-clamp-1">
                    {item.numberOfBedrooms} phòng
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-toilet"}>
                  <span className="line-clamp-1">
                    {item.numberOfToilet} phòng
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <div className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center ">
                  <span className="text-xs text-white line-clamp-1">
                    {getTradingForm(item.tradingForm)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {item.category === 1 && (
            <div className="bg-base-200 p-3 rounded-xl text-sm flex flex-col space-y-1 text-[#363636] border-[#ccc] border-[1px]">
              <div className="flex items-center space-x-5">
                <CharacteristicsItem
                  icon={"fa-regular fa-up-right-and-down-left-from-center"}
                >
                  <span className="line-clamp-1">
                    {item.area} m<sup>2</sup>
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-loveseat"}>
                  <span className="line-clamp-1">
                    {typeOfApartment[item.typeOfApartment]}
                  </span>
                </CharacteristicsItem>

                {item.category === 1 && (
                  <Fragment>
                    <Dot className="w-[4px] h-[4px] bg-gray-300" />
                    <CharacteristicsItem icon={"fa-regular fa-sack-dollar"}>
                      <span className="line-clamp-1">
                        {item.deposit ? formatPrice(item.deposit) : 0}{" "}
                        <span>&#8363;</span>
                      </span>
                    </CharacteristicsItem>
                  </Fragment>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <CharacteristicsItem icon={"fa-regular fa-bed"}>
                  <span className="line-clamp-1">
                    {item.numberOfBedrooms} phòng
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <CharacteristicsItem icon={"fa-regular fa-toilet"}>
                  <span className="line-clamp-1">
                    {item.numberOfToilet} phòng
                  </span>
                </CharacteristicsItem>
                <Dot className="w-[4px] h-[4px] bg-gray-300" />
                <div className="min-w-[40px] justify-center px-1 py-0.5 bg-primary rounded-md flex items-center">
                  <span className="text-xs text-white line-clamp-1">
                    {getTradingForm(item.tradingForm)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <UserInfo user={item.user || user} id={item.userId || user.id} />
            <span className="text-sm text-info">
              {formatDate(item.createdAt)}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <TitlePostItem
            className={"font-bold text-info flex items-center h-[50px]"}
          >
            <span> {item.title}</span>
          </TitlePostItem>

          <CharacteristicsItem
            icon={"fa-regular fa-location-dot"}
            className={"py-2"}
          >
            <span className="text-sm line-clamp-1">
              {districtsConfig[item.district]}, {provincesConfig[item.province]}
            </span>
          </CharacteristicsItem>
          <div
            className="line-clamp-4 min-h-[100px]"
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          ></div>
          <div className="pt-2 flex items-center justify-between">
            <UserInfo user={item.user || user} id={item.userId || user.id} />
            <span className="text-sm text-info">
              {formatDate(item.createdAt)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
