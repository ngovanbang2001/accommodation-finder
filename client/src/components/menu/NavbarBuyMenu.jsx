import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { MenuItem as MyMenuItem } from "./MenuItem";
import { useRouter } from "next/router";
export default function NavbarBuyMenu() {
  const router = useRouter();
  const [checkURL, setCheckURL] = useState(null);
  useEffect(() => {
    if (router && router.asPath.includes("tradingForm=2")) {
      setCheckURL(true);
    } else {
      setCheckURL(false);
    }
  }, [router]);
  const menu = [
    {
      id: 1,
      title: "Căn hộ chung cư",
      path: "/filter?tradingForm=2&category=1",
    },
    { id: 2, title: "Nhà ở", path: "/filter?tradingForm=2&category=2" },
    {
      id: 3,
      title: "Văn phòng/Mặt bằng",
      path: "/filter?tradingForm=2&category=3",
    },
  ];

  const handleClickMenuItem = (item) => {
    router.push(item.path);
  };

  return (
    <Menu
      menuButton={
        <MenuButton>
          <span className={`nav-item font-bold cursor-pointer`}>
            <span className={`${checkURL ? "text-primary" : ""}`}>Mua bán</span>
          </span>
        </MenuButton>
      }
      transition
    >
      {menu.map((item) => (
        <MenuItem key={item.id} onClick={() => handleClickMenuItem(item)}>
          <MyMenuItem title={item.title} />
        </MenuItem>
      ))}
    </Menu>
  );
}
