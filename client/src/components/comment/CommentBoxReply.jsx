import CommentInput from "@/components/comment/CommentInput";
import Image from "next/image";
import camera from "@/assets/images/camera.png";
import video from "@/assets/images/video.png";
import Avatar from "../user/Avatar";
import { BigPlayButton, ControlBar, Player } from "video-react";
export default function CommentBoxReply({
  postId,
  profile,
  comment,
  setComment,
  handlePostComment,
  handleChangeInput,
  handleChangeVideoInput,
  imageURL,
  videoURL,
  setImageURL,
  setVideoURL,
  loading,
}) {
  return (
    <div className={`flex items-start space-x-3`}>
      <Avatar sizeAvatar="w-12" avatar={profile.avatar} />
      <div className={` bg-base-200 w-full rounded-lg overflow-hidden`}>
        <div className={"p-3"}>
          <CommentInput comment={comment} setComment={setComment} />
          <div className="flex items-center justify-end">
            <div
              className={
                "flex justify-end pt-3 cursor-pointer items-center space-x-2"
              }
            >
              <label
                htmlFor="upload-img-reply"
                className="cursor-pointer flex items-center"
              >
                <Image
                  src={camera}
                  alt={"camera"}
                  width={40}
                  height={35}
                  objectFit={"contain"}
                />
              </label>
              <label
                htmlFor="upload-video-reply"
                className="cursor-pointer flex items-center"
              >
                <Image
                  src={video}
                  alt={"video"}
                  width={40}
                  height={39}
                  objectFit={"contain"}
                />
              </label>
              <input
                type={"file"}
                id={"upload-img-reply"}
                accept="image/png, image/jpeg"
                className={"hidden"}
                onChange={(e) => handleChangeInput(e)}
              />
              <input
                type={"file"}
                id={"upload-video-reply"}
                accept=".mov,.mp4"
                className={"hidden"}
                onChange={(e) => handleChangeVideoInput(e)}
              />
            </div>
            <div
              className={"flex justify-end pt-3 cursor-pointer ml-2.5"}
              onClick={handlePostComment}
            >
              <span
                className={`px-3 py-2 bg-primary rounded-lg text-white text-sm font-semibold`}
              >
                {!loading ? (
                  <span>Bình luận</span>
                ) : (
                  <i class="fas fa-spinner fa-spin text-white"></i>
                )}
              </span>
            </div>
          </div>
          {imageURL && (
            <div className={"relative w-fit"}>
              <Image
                src={imageURL}
                alt="not fount"
                objectFit="cover"
                width={100}
                height={75}
              />
              <div
                className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                onClick={() => {
                  setImageURL("");
                }}
              >
                <i className="fa-regular fa-xmark text-white text-sm"></i>
              </div>
            </div>
          )}

          {videoURL && (
            <div className="h-[100px] w-[150px] relative">
              <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
                <Player
                  playsInline
                  src={videoURL}
                  className={"h-[150px]"}
                  poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
                >
                  <ControlBar autoHide={false} className="my-class" />
                  <BigPlayButton position="center" />
                </Player>
              </div>
              <div
                className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                onClick={() => setVideoURL("")}
              >
                <i className="fa-regular fa-xmark text-white text-sm"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
