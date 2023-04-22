import React, { Fragment, useEffect, useState } from "react";
import photo_camera from "@/assets//images/camera/photo-camera.svg";
import Image from "next/image";
import { convertBase64 } from "utils/uploadImage";
import { userAPI } from "apis/user";
import { toast } from "react-toastify";
const CoverImageSection = ({
  imgCover,
  userId,
  avatar,
  showIconUpload = true,
}) => {
  const [imagecoverSource, setImageCoverSource] = useState(null);
  useEffect(() => {
    console.log("imgCover", imgCover);
    if (imgCover) {
      setImageCoverSource(imgCover);
    }
  }, [imgCover]);
  const handleUploadImageCover = async (e) => {
    if (e.target.files[0]) {
      setImageCoverSource(URL.createObjectURL(e.target.files[0]));
      const base64 = await convertBase64(e.target.files[0]);
      try {
        const res = await userAPI.updateAccount({
          id: userId,
          data: { base64ImageCover: base64 },
        });
        if (res.ok) {
          toast.success("Cập nhật thông tin thành công!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (e) {
        console.log(e);
        toast.error("Cập nhật thông tin thất bại!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };
  return (
    <div className="relative">
      <div className="relative lg:h-[400px] md:h-[300px] h-[200px] w-full border border-gray-100 rounded-bl-xl rounded-br-xl overflow-hidden">
        {imagecoverSource ? (
          <Image
            src={imagecoverSource}
            layout={"fill"}
            objectFit={"cover"}
            alt={"img-cover"}
            className={"rounded-bl-xl rounded-br-xl"}
          />
        ) : (
          <div
            style={{
              backgroundImage: `url(${avatar})`,
              width: "100%",
              height: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              filter: "blur(80px)",
            }}
          ></div>
        )}
      </div>

      {showIconUpload && (
        <Fragment>
          <div className="absolute right-3 bottom-1">
            <label
              htmlFor={"upload-imageCover"}
              className={
                "bg-gray-200 flex justify-center h-fit p-1 rounded-md absolute bottom-2 right-2 cursor-pointer w-[40px]"
              }
              title="Cập nhật ảnh bìa"
            >
              <div className={"relative w-[15px] h-[15px]"}>
                <Image
                  src={photo_camera}
                  alt={"icon upload"}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>
            </label>
          </div>
          <input
            type={"file"}
            hidden
            accept="image/png, image/svg, image/jpeg"
            id={"upload-imageCover"}
            onChange={(e) => handleUploadImageCover(e)}
          />
        </Fragment>
      )}
    </div>
  );
};

export default CoverImageSection;
