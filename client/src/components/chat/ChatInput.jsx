import Image from "next/image";
import camera from "@/assets/images/camera.png";
import video from "@/assets/images/video.png";
import { BigPlayButton, ControlBar, Player } from "video-react";
export default function ChatInput({
  message,
  setMessage,
  handleSendMessage,
  handleUploadImages,
  handleUploadVideo,
  soureImage,
  soureVideo,
  setSoureImage,
  setSoureVideo,
}) {
  return (
    <div className="sticky bottom-0 py-2 px-4 flex items-center justify-between space-x-5 bg-white box-shadow">
      <div className={`w-full rounded-lg overflow-hidden`}>
        <div>
          <div className="flex items-center">
            <input
              type={"text"}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder={"Nhập chat vào đây"}
              className={
                "border border-primary p-3 w-full rounded-lg outline-none"
              }
            />
            <div className="flex items-center justify-end">
              <div
                className={"flex justify-end pt-3 cursor-pointer items-center"}
              >
                <label
                  htmlFor="upload-img"
                  className="cursor-pointer flex items-center"
                >
                  <Image
                    src={camera}
                    alt={"camera"}
                    width={70}
                    height={35}
                    objectFit={"contain"}
                  />
                </label>
                <label
                  htmlFor="upload-video"
                  className="cursor-pointer flex items-center"
                >
                  <Image
                    src={video}
                    alt={"video"}
                    width={70}
                    height={35}
                    objectFit={"contain"}
                  />
                </label>
                <input
                  type={"file"}
                  id={"upload-img"}
                  accept="image/png, image/jpeg"
                  className={"hidden"}
                  onChange={(e) => handleUploadImages(e)}
                />
                <input
                  type={"file"}
                  id={"upload-video"}
                  accept=".mov,.mp4"
                  className={"hidden"}
                  onChange={(e) => handleUploadVideo(e)}
                />
              </div>
              <div
                className={"flex justify-end pt-3 cursor-pointer"}
                onClick={handleSendMessage}
              >
                <span
                  className={
                    "px-3 py-2 bg-primary rounded-lg text-white text-sm font-semibold"
                  }
                >
                  Gửi
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            {soureImage && (
              <div className={"relative w-fit"}>
                <Image
                  src={soureImage}
                  alt="not fount"
                  objectFit="cover"
                  width={50}
                  height={25}
                />
                <div
                  className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                  onClick={() => {
                    setSoureImage("");
                  }}
                >
                  <i className="fa-regular fa-xmark text-white text-sm"></i>
                </div>
              </div>
            )}

            {soureVideo && (
              <div className="h-[25px] w-[50px] relative">
                <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
                  <Player
                    playsInline
                    src={soureVideo}
                    className={"h-[50px]"}
                    poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
                  >
                    <ControlBar autoHide={false} className="my-class" />
                    <BigPlayButton position="center" />
                  </Player>
                </div>
                <div
                  className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                  onClick={() => setSoureVideo("")}
                >
                  <i className="fa-regular fa-xmark text-white text-sm"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
