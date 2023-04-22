import Image from "next/image";
import * as React from "react";
import styles from "./HomePostItem.module.scss";
import map from "@/assets/images/map.webp";
export default function OutstandingPost(props) {
    return (<div className={styles["list-item"]}>
      <div className="flex gap-x-2">
        <div className="h-ful w-2/3">
          <Image src={map} alt="" className="rounded-lg object-fit"/>
        </div>
        <div className="">
          <span className="font-semibold line-clamp-2 text-info">
            Phòng mới 100% full nội thất 25m2 ban công View Landmark 81
          </span>
          <div className="flex items-center gap-x-2 justify-between pt-2">
            <span className="font-semibold text-gradient">5 triệu/tháng</span>
            <span className="text-sm">Hôm nay</span>
          </div>
        </div>
      </div>
    </div>);
}
