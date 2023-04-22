import React from "react";
import { formatPrice } from "utils/common";

const PostTypeItem = ({ item }) => {
  const features = item.features.split("\n");
  return (
    <div className={"box-shadow rounded-lg p-4 md:w-1/4"}>
      <div>
        <div className={"flex items-center justify-center space-x-1"}>
          <i className="fa-sharp fa-solid fa-award text-primary"></i>
          <span className={"font-bold text-primary text-xl"}>{item.title}</span>
        </div>
      </div>
      <div className={"text-justify py-4 text-sm"}>
        <p>{item.description}</p>
      </div>
      <div className={"flex flex-col space-y-2"}>
        {features.map((f, index) => (
          <div className={"flex items-baseline space-x-1"} key={index}>
            <i className="fa-duotone fa-circle-check text-primary"></i>
            <span>{f}</span>
          </div>
        ))}

        <div className="font-bold">Giá tiền</div>
        <div className={"flex items-center space-x-1"}>
          <i className="fa-duotone fa-circle-dollar text-primary"></i>
          <span>
            {formatPrice(item.priceForDay)}
            <span> &#8363;</span>
            <span>/tin/ngày</span>
          </span>
        </div>
        <div className={"flex items-center space-x-1"}>
          <i className="fa-duotone fa-circle-dollar text-primary"></i>
          <span>
            <span>{formatPrice(item.priceForWeek)}</span>
            <span> &#8363;</span>
            <span>/tin/tuần</span>
          </span>
        </div>
        <div className={"flex items-center space-x-1"}>
          <i className="fa-duotone fa-circle-dollar text-primary"></i>
          <span>
            {formatPrice(item.priceForMonth)}
            <span> &#8363;</span>
            <span>/tin/tháng</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostTypeItem;
