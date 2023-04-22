import React, { useEffect, useState } from "react";
import TitleSection from "../common/TitleSection";
import Image from "next/image";
import building from "@/assets/images/building/building.png";
import { statisticAPI } from "apis/statistic";
export default function AboutSection() {
  const [info, setInfo] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await statisticAPI.getInfo();
        if (res) {
          setInfo(res);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="bg-backgroundSecondary mb-8">
      <div className="container md:grid grid-cols-2 gap-x-5">
        <div className="flex items-center justify-center">
          <div className="relative md:w-[480px] w-[280px] md:h-[280px] h-[150px]">
            <Image
              src={building}
              layout={"fill"}
              className={"object-cover"}
              alt="img-question"
            />
          </div>
        </div>
        <div className="flex items-center flex-col space-y-4 md:py-8 pb-8 lg:px-4 px-2">
          <TitleSection title={"Tại sao chọn chúng tôi"} isColorWhite={true} />
          <div className="lg:text-4xl text-xl font-bold text-white">
            <div className="pb-2">Chúng tôi cung cấp</div>
            <div>Dịch vụ đáng tin cậy</div>
          </div>
          <p className="text-white py-2 leading-8 text-justify">
            TROTOT cung cấp nền tảng đăng tin/xem tin Bất động sản đơn giản,
            nhanh chóng và dễ dàng. Khi sử dụng dịch vụ của TROTOT, tin đăng của
            bạn sẽ được tiếp cận với lượng khách hàng lớn. Từ đó, tăng khả năng
            tương tác, trao đổi và giao dịch.
          </p>
          <div className="flex items-center justify-evenly w-full">
            <div className="flex flex-col items-center">
              <span className="font-bold text-primary lg:text-3xl text-xl">
                {info?.accountTotal}
              </span>
              <div className="text-white font-bold lg:text-xl py-1">
                khách hàng
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold lg:text-3xl text-xl text-primary">
                {info?.postTotal}
              </span>
              <div className="text-white font-bold lg:text-xl py-1">
                tin đăng
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
