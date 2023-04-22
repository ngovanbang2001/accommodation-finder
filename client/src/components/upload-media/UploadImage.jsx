import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import gallery from "@/assets/images/post-new/gallery.png";
import FormGroup from "../common/FormGroup";
import { convertBase64 } from "utils/uploadImage";
const UploadImage = ({
  base64,
  setBase64,
  url = "",
  setUrlImage = () => {},
  width = "w-1/2",
  height = "h-[300px]",
  id,
  done = false,
}) => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const handleChangeInput = (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (done) {
      setImageURL(null);
    }
  }, [done]);

  useEffect(() => {
    (async () => {
      if (file) {
        const url = URL.createObjectURL(file);
        setImageURL(url);
        setUrlImage(url);
        const base64s = await convertBase64(file);
        setBase64(base64s);
      } else {
        setImageURL(url);
      }
    })();
  }, [file, url]);

  const handleRemoveImage = () => {
    setImageURL("");
  };

  return (
    <div className={`${width}`}>
      <FormGroup>
        <div className="w-full">
          <div className="flex items-center flex-wrap gap-2">
            {imageURL && (
              <div
                className={`relative w-full ${height} border border-gray-200 rounded-lg`}
              >
                <Image
                  src={imageURL}
                  alt="not fount"
                  layout="fill"
                  className="border border-gray-200 rounded-lg object-cover"
                />
                <div
                  className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                  onClick={() => handleRemoveImage()}
                >
                  <i className="fa-regular fa-xmark text-white text-sm"></i>
                </div>
              </div>
            )}
          </div>

          {!imageURL && (
            <div className="w-full">
              <label
                className="flex flex-col justify-center space-y-2 "
                htmlFor={id}
              >
                <div
                  className={`border border-dashed border-primary flex items-center justify-center ${height} rounded-lg cursor-pointer`}
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={gallery}
                      layout={"fill"}
                      className={"cover"}
                      alt={"gallery"}
                    />
                  </div>
                </div>
              </label>
            </div>
          )}
        </div>
        <input
          type={"file"}
          multiple
          className="hidden"
          id={id}
          onChange={(e) => handleChangeInput(e)}
          accept="image/png, image/jpeg"
        />
      </FormGroup>
    </div>
  );
};

export default UploadImage;
