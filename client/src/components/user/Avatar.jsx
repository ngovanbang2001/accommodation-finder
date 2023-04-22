import * as React from "react";
import photo_camera from "@/assets//images/camera/photo-camera.svg";
import Image from "next/image";
export default function Avatar({
  sizeAvatar = "",
  avatar = "https://placeimg.com/192/192/people",
  className = "",
  isShowUploadIcon = false,
}) {
  return (
    <div
      className={`avatar ${className} relative border border-gray-100 rounded-full`}
    >
      <div className={`${sizeAvatar} rounded-full`}>
        <img src={avatar} alt={"avatar-user"} />
      </div>
      {isShowUploadIcon && (
        <div
          className={
            "bg-gray-200 w-fit h-fit p-2 rounded-full absolute bottom-2 right-2 cursor-pointer"
          }
        >
          <div className={"relative w-[20px] h-[20px] box-shadow"}>
            <Image
              src={photo_camera}
              alt={"icon upload"}
              layout={"fill"}
              objectFit={"cover"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
