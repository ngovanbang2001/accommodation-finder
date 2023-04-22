import Image from "next/image";
import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import logo from "@/assets/images/logo_no_icon.png";
import Gallery from "../post/Gallery";
import {
  categoryTitleConfig,
  districtsConfig,
  furnitureConfig,
  privateToiletConfig,
  provincesConfig,
  stayWithHostConfig,
  tradingConfig,
  typeHouse,
  typeOffice,
  wardsConfig,
} from "configs/configs";
import { formatPrice, generateSpecificAdress } from "utils/common";
import CharacteristicsItem from "../characteristics/CharacteristicsItem";
import TitleSection from "../common/TitleSection";
import CharacteristicsContainer from "../characteristics/CharacteristicsContainer";
import { formatDate } from "utils/moment";
import CharacteristicsApartment from "../characteristics/CharacteristicsApartment";
import CharacteristicsHouse from "../characteristics/CharacteristicsHouse";
import CharacteristicsOffice from "../characteristics/CharacteristicsOffice";
import CharacteristicsMotel from "../characteristics/CharacteristicsMotel";
import PostTag from "../post/PostTag";
const ModalPreviewPost = ({
  handleClick = () => {},
  id,
  postPreview,
  handleDone,
}) => {
  const handlePostNew = () => {
    handleDone(2);
  };
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-preview-post-id"}
      >
        {postPreview ? (
          <label
            className="modal-box relative max-w-4xl w-10/12 modal-preview-post"
            htmlFor=""
          >
            <h3 className="text-lg font-bold my-0">Xem trước tin đăng</h3>
            <div className="m-4">
              <div>
                <div className="relative">
                  <Gallery
                    images={postPreview.images}
                    video={postPreview.video}
                  />
                  <PostTag
                    tag={categoryTitleConfig[postPreview.category]}
                    category={postPreview.category}
                    classCustom={"min-w-[100px] text-center"}
                  />
                </div>
                <div className="py-4">
                  <div className="font-semibold text-xl">
                    {postPreview.title}
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fa-light fa-location-dot"></i>
                    <span>
                      {generateSpecificAdress(
                        postPreview.houseNumber,
                        postPreview.lane,
                        postPreview.street,
                        wardsConfig[postPreview.ward],
                        districtsConfig[postPreview.district],
                        provincesConfig[postPreview.province]
                      )}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary pt-3">
                    <span>{formatPrice(postPreview.price)}</span>/tháng
                  </div>
                  <div className={""}>
                    <div className="flex justify-between items-center py-2">
                      <CharacteristicsItem icon={"fa-regular fa-clock"}>
                        <span className={"text-sm"}>
                          {formatDate(postPreview.updatedAt)}
                        </span>
                      </CharacteristicsItem>
                    </div>
                    {postPreview.tradingForm !== 3 && (
                      <div className="pt-2">
                        <TitleSection title="Đặc điểm bất động sản" />
                        {postPreview.category === 1 && (
                          <CharacteristicsApartment post={postPreview} />
                        )}

                        {postPreview.category === 2 && (
                          <CharacteristicsHouse post={postPreview} />
                        )}
                        {postPreview.category === 3 && (
                          <CharacteristicsOffice post={postPreview} />
                        )}

                        {postPreview.category === 4 && (
                          <CharacteristicsMotel post={postPreview} />
                        )}
                      </div>
                    )}
                    <div className="pt-6">
                      <TitleSection title="Mô tả chi tiết" />
                      <div className="leading-8 text-justify">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: postPreview.description,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4">
              <ButtonPrimary
                title="Tiếp tục đăng tin"
                handleClick={handlePostNew}
                className={"w-full"}
              />
            </div>
          </label>
        ) : null}
      </label>
    </div>
  );
};

export default ModalPreviewPost;
