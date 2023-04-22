import Image from "next/image";
import React from "react";

const SecondaryBlogItem = ({ item, handleClick }) => {
  return (
    <div
      className={"cursor-pointer flex items-start space-x-2"}
      onClick={handleClick}
    >
      <div className={"w-[200px] h-[130px] relative"}>
        <Image
          src={item.thumbnail}
          layout={"fill"}
          objectFit={"cover"}
          className={"rounded-lg"}
          alt={item.title}
        />
      </div>
      <div className="flex-1">
        <h3 className={"m-0"}>{item.title}</h3>
        <div className="line-clamp-3 my-2 text-sm text-info">
          Tôi được một đứa cháu là sinh viên ở TPHCM giới thiệu cho trang web
          Phongtro123.com. Nó bảo nếu bác có phòng trọ trống, chưa cho thuê được
          thì chụp hình đăng lên web, sẽ nhanh chóng có người thuê tìm đến. Tôi
          cũng lần mò dùng thử, kết quả làm tôi khá bất ngờ. Cụ thể, từ ngày
          biết đến và sử dụng dịch vụ đăng tin cho thuê phòng trọ trên trang
          Phongtro123.com, các căn trọ của tôi luôn được lấp đầy. Những lúc có
          người chuyển đi, chỉ cần tôi đăng tin vài ngày là lại có khách thuê
          mới tìm đến, thật sự rất hiệu quả. Chỉ với một ít tiền phí đăng tin đã
          giúp tôi nhanh chóng cho thuê được vài căn trọ thì tôi thấy mức giá
          này là rất rẻ, vô cùng hợp lý. Tôi thực sự ấn tượng với website này.
        </div>
      </div>
    </div>
  );
};

export default SecondaryBlogItem;
