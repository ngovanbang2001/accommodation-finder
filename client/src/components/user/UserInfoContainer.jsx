import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { strToSlug } from "utils/common";
import ButtonPrimary from "../button/ButtonPrimary";
import ButtonSecondary from "../button/ButtonSecondary";
import Avatar from "./Avatar";
import FullName from "./FullName";
import PersonalInfoContainer from "./PersonalInfoContainer";
export default function UserInfoContainer({ user, userId,tradingForm }) {
  const router = useRouter();
  const profile = useSelector((state) => state.auth.profile);
  const handleShowProfile = () => {
    const slug = strToSlug(user.displayName);
    router.push(`/profile/${slug}-${userId}`);
  };

  const handleChat = () => {
    router.push(`/chat/${userId}`);
  };
  return (
    <div className="p-4 box-shadow rounded-xl h-fit">
      <div className="text-center bg-base-100 h-fit p-4">
        <Avatar sizeAvatar={"w-28"} avatar={user.avatar} />
        <div className="flex justify-center items-center gap-x-2">
          <FullName className="text-xl" fullName={user.displayName} />
        </div>
        <div className="flex items-center justify-center gap-x-2 py-4">
          <ButtonSecondary
            isPrimary={false}
            title={"Xem trang"}
            handleClick={handleShowProfile}
          />
        </div>
        <PersonalInfoContainer tradingForm={tradingForm} />
        {profile !== userId && (
          <div className="flex items-center gap-x-3">
            <ButtonPrimary
              title={"097628525"}
              iconName={"fa-sharp fa-solid fa-phone"}
              isPrimary={true}
              className={"bg-primary text-white w-full"}
              sizeIcon={"lg"}
            />
            <ButtonPrimary
              title={"Nhắn tin"}
              iconName={"fa-sharp fa-regular fa-comment text-primary"}
              className={"w-full"}
              isPrimary={false}
              handleClick={handleChat}
            />
          </div>
        )}
      </div>
    </div>
  );
}
