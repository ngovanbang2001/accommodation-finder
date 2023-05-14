import * as React from "react";
export default function PostNewSectionTutorial() {
  return (
    <div className="hidden lg:flex flex-col gap-y-10">
      <div className="border-2 border-primary rounded-lg p-4">
        <div className="flex items-center gap-x-2 pb-2 border-b-2 border-primary justify-center">
          <i className="fa-regular fa-fire text-lg text-primary"></i>
          <h3 className="m-0 text-primary">Hướng dẫn đăng tin</h3>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <i className="fa-regular fa-circle-check text-lg text-green-400"></i>
            <span className="py-2 block font-bold text-green-400">
              Nội dung tốt
            </span>
          </div>
          <ul className="flex flex-col gap-y-4 list-disc pl-5">
            <li>Nhập ảnh thật được nhiều người xem hơn</li>
            <li>Nhập đầy đủ địa chỉ bất động sản cần đăng tin</li>
            <li>Nhập đầy đủ diện tích bất động sản</li>
            <li>Nhập đầy đủ giá cả, chứng nhận pháp lý</li>
            <li>Miêu tả những điểm nổi bật, đặc thù của bất động sản</li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-x-2 pt-4 pb-2">
            <i className="fa-regular fa-ban text-lg text-red-500"></i>
            <span className="block font-bold text-red-500">
              Nội dung không tốt
            </span>
          </div>
          <ul className="flex flex-col gap-y-4 list-disc pl-5">
            <li>Hình ảnh không rõ nét, sao chép</li>
            <li>Địa chỉ không rõ ràng</li>
            <li>Thông tin bất động sản không chính xác</li>
            <li>Mô tả tin đăng không đầy đủ, chính xác</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
