import Image from "next/image";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const DrawerHeader = () => {
  const profile = useSelector((state) => state.auth.profile);

  return (
    <div className="bg-primary p-2">
      <div className="flex items-center space-x-3">
        {profile?.avatar ? (
          <Fragment>
            <div className="h-[40px] w-[40px] relative cursor-pointer">
              <Image
                alt="avatar"
                layout="fill"
                objectFit="cover"
                src={profile.avatar}
                className="rounded-full"
              />
            </div>
            <span className="font-bold text-white">{profile.displayName}</span>
          </Fragment>
        ) : (
          <Fragment>
            <i className="fa-light fa-circle-user text-white text-[32px] block lg:hidden cursor-pointer"></i>
            <span className="font-bold text-white">Đăng nhập ngay</span>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DrawerHeader;
