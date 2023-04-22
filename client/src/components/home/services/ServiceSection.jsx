import * as React from "react";
import ServiceItem from "./ServiceItem";
import apartment from "@/assets/images/services/apartment.png";
import home from "@/assets/images/services/home.png";
import shop from "@/assets/images/services/shop.png";
import office from "@/assets/images/services/office.png";
import soil from "@/assets/images/services/soil.png";
import room from "@/assets/images/services/room.png";
import { useRouter } from "next/router";
import { tradingFormConfig } from "configs/configs";
const servicesPurchase = [
  { id: 1, img: apartment, title: "Căn hộ/Chung cư", category: 1 },
  { id: 2, img: home, title: "Nhà ở", category: 2 },
  { id: 4, img: office, title: "Văn phòng/Mặt bằng kinh doanh", category: 3 },
];
const servicesRental = [
  { id: 1, img: room, title: "Phòng trọ", category: 4 },
  { id: 2, img: apartment, title: "Căn hộ/Chung cư", category: 1 },
  { id: 3, img: home, title: "Nhà ở", category: 2 },
  { id: 5, img: office, title: "Văn phòng/Mặt bằng kinh doanh", category: 3 },
];
export default function ServiceSection() {
  const router = useRouter();
  const handleClick = (category, kind) => {
    router.push(`/filter?tradingForm=${kind}&category=${category}`);
  };
  React.useEffect(() => {

  }, [])
  return (
    <div className="px-2 lg:px-8 overflow-hidden bg-base-100 mb-8 pb-8">
      <div className="pb-4">
        <div className="divider text-lg font-semibold text-info">
          Dịch vụ bán
        </div>
        <div className="flex items-center justify-center flex-wrap pt-2">
          {servicesPurchase.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                handleClick(item.category, tradingFormConfig["BUY_SELL"])
              }
            >
              <ServiceItem item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="divider text-lg font-semibold text-info">
          Dịch vụ cho thuê
        </div>
        <div className="flex items-center justify-center flex-wrap pt-2">
          {servicesRental.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                handleClick(item.category, tradingFormConfig["FOR_RENTAL"])
              }
            >
              <ServiceItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
