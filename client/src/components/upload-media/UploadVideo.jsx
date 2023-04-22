import Image from "next/image";
import React, { useState } from "react";
import video from "@/assets/images/post-new/video.png";
import FormGroup from "../common/FormGroup";
import { async } from "@firebase/util";
import { convertBase64 } from "utils/uploadImage";
import { BigPlayButton, ControlBar, Player } from "video-react";

const UploadVideo = ({ base64Video, setBase64Video }) => {
  const [source, setSource] = useState("");
  const [sizeVideo, setSizeVideo] = useState(null);
  const handleUploadVideo = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      if (base64) {
        setBase64Video(base64);
      }
      setSource(URL.createObjectURL(file));
      setSizeVideo(file.size > 25 * 1048576);
    }
  };
  const handleRemoveVideo = () => {
    setSource("");
  };
  return (
    <div className="flex flex-col justify-center space-y-2 md:w-1/2 w-full">
      <FormGroup isMb={false}>
        <div className="flex flex-col justify-center">
          <div className="font-bold">Video</div>

          <div className="flex items-center space-x-1">
            <i className="text-primary fa-regular fa-circle-exclamation"></i>
            <span className="text-sm">
              Tùy chọn tải lên <span className="font-bold">1</span> video.
            </span>
          </div>
          {!sizeVideo && (
            <span className="text-sm italic font-bold">
              * Dung lượng video tối đa <span>25 MB.</span>
            </span>
          )}
        </div>
        {!source && (
          <label htmlFor="upload-video">
            <div className="border border-dashed border-primary flex items-center justify-center h-[250px] rounded-lg cursor-pointer">
              <div className="relative w-20 h-20">
                <Image
                  src={video}
                  layout={"fill"}
                  className={"cover"}
                  alt={"video"}
                />
              </div>
            </div>
          </label>
        )}
        {source && (
          <div className="h-[250px] w-full relative">
            <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
              <Player
                playsInline
                src={source}
                className={"h-[250px]"}
                poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
              >
                <ControlBar autoHide={false} className="my-class" />
                <BigPlayButton position="center" />
              </Player>
            </div>
            <div
              className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
              onClick={() => handleRemoveVideo()}
            >
              <i className="fa-regular fa-xmark text-white text-sm"></i>
            </div>
          </div>
        )}
        <input
          className="hidden"
          type="file"
          id="upload-video"
          onClick={(event) => {
            event.target.value = null;
          }}
          onChange={handleUploadVideo}
          accept=".mov,.mp4"
        />
        <div className="h-[20px]">
          {sizeVideo && (
            <div className="text-sm text-red-500">Dung lượng tối đa 25 MB.</div>
          )}
        </div>
      </FormGroup>
    </div>
  );
};

export default UploadVideo;
