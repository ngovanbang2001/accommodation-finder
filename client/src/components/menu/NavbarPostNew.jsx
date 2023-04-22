import React, { Fragment } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Router from "next/router";
import { MenuItem as MyMenuItem } from "./MenuItem";
import { useSelector } from "react-redux";
import ModalRequirePhoneNumber from "../modal/ModalRequirePhoneNumber";

export default function NavbarPostNew() {
  const profile = useSelector((state) => state.auth.profile);
  const menu = [
    {
      id: 1,
      title: "Đăng tin cho thuê",
      icon: "fa-light fa-rectangle-history-circle-plus",
      path: "/post/for-rent-post/create-post",
    },
    {
      id: 2,
      title: "Đăng tin bán",
      icon: "fa-light fa-money-check-dollar-pen",
      path: "/post/purcharse-post/create-post",
    },
    {
      id: 3,
      title: "Đăng tin cần thuê",
      icon: "fa-light fa-octagon-plus",
      path: "/post/rent-post/create-post",
    },
    {
      id: 4,
      title: "Đăng tin tìm bạn ở ghép",
      icon: "fa-light fa-user-group",
      path: "/post/looking-roomate-post/create-post",
    },
  ];

  const handleMenuClick = async (item) => {
    if (!profile.phoneNumber || !profile.email) {
      const modal = document.getElementById("modal-require-phoneNumber-id");
      if (modal) {
        modal.click();
      }
    } else {
      Router.push(item.path);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Menu
        menuButton={
          <MenuButton>
            <div className="nav-item font-bold cursor-pointer flex items-center space-x-2 bg-primary px-3 py-1 rounded-full">
              <i className="fa-regular fa-pencil text-lg text-white"></i>
              <span className="text-white">Đăng tin</span>
            </div>
          </MenuButton>
        }
        transition
      >
        <Fragment>
          {menu.map((item) => (
            <MenuItem onClick={() => handleMenuClick(item)} key={item.id}>
              <MyMenuItem title={item.title} icon={item.icon} />
            </MenuItem>
          ))}
        </Fragment>
      </Menu>
      <ModalRequirePhoneNumber
        id={"modal-require-phoneNumber-id"}
        userId={profile.id}
      />
    </div>
  );
}
