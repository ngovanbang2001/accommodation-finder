import Image from "next/image";
import * as React from "react";
import question from "assets/images/qa/question.png";
import ButtonPrimary from "../button/ButtonPrimary";
export default function ContactSection(props) {
  return (
    <div className="container mx-auto p-8 box-shadow rounded-xl">
      <div className="flex items-center justify-between gap-x-5">
        <div className="w-8/12">
          <div className="pb-4">
            <h2 className="my-2">
              Bạn không tìm thấy tin đăng phù hợp với mình.
            </h2>
            <span>
              Hãy để lại thông tin, chúng tôi sẽ liên hệ bạn khi có tin đăng
              mới.
            </span>
          </div>
          <div className="flex justify-between gap-x-3">
            <div className="flex flex-col gap-y-2 w-full">
              <label>Họ tên</label>
              <input
                type={"text"}
                placeholder={"VD: Quang Thuận"}
                className={"rounded-md p-3 border border-gray-300"}
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <label>Số điện thoại</label>
              <input
                type={"text"}
                placeholder={"VD: 0973662578"}
                className={"rounded-md p-3 border border-gray-300"}
              />
            </div>
          </div>
          <ButtonPrimary
            title="Thông báo cho tôi"
            iconName={"fa-regular fa-bell"}
            className={"my-4 bg-secondary w-full"}
          />
        </div>
        <div className="w-4/12">
          <div className="relative w-full h-[250px]">
            <Image
              src={question}
              layout={"fill"}
              className={"object-contain"}
              alt="img-question"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
