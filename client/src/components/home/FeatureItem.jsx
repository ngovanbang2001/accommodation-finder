import Image from "next/image";
import * as React from "react";
export default function FeatureItem({ item }) {
    return (<div className="col-span-1 flex flex-col items-center justify-center border-r-[1px] last:border-r-0 border-r-white">
      <div className="relative w-full h-[60px]">
        <Image src={item.img} alt="feature-item-img" className="object-contain" layout="fill"/>
      </div>
      <span className="py-2 font-semibold text-white">{item.des}</span>
    </div>);
}
