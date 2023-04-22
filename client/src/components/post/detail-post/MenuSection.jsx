import * as React from "react";
import MenuSectionItem from "./MenuSectionItem";
const menuSections = [
  { id: 1, title: "Thông tin tổng quan" },
  { id: 2, title: "Đặc điểm tin đăng" },
  { id: 3, title: "Thông tin liên hệ" },
  { id: 4, title: "Bản đồ" },
  { id: 5, title: "Bình luận" },
];
export default function MenuSection(props) {
  return (
    <ul className="flex items-center space-x-10 justify-center overflow-y-auto menu-section">
      {menuSections.map((item) => (
        <MenuSectionItem
          key={item.id}
          title={item.title}
          isActive={item.id === 1 ? true : false}
        />
      ))}
    </ul>
  );
}
