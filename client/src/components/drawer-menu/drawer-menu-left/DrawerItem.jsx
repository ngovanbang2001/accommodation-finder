import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../StylesDrawerMenu.module.scss";
const DrawerItem = ({ item, setShow }) => {
  const [openMenuItem, setOpenMenuItem] = useState(false);
  const handleSelectMenuItem = () => {
    setOpenMenuItem(!openMenuItem);
  };
  const router = useRouter();

  const handleClick = (i) => {
    if (item.children) {
      if (item.id < 4) {
        const id = i.id;
        switch (item.id) {
          case 1: {
            router.push(`/filter?tradingForm=1&category=${id}`);
            break;
          }
          case 2: {
            router.push(`/filter?tradingForm=3&category=${i.id}`);
            break;
          }
          case 3: {
            router.push(`/filter?tradingForm=2&category=${i.id}`);
            break;
          }
        }
      } else {
        router.push(`${i.path}`);
      }
    } else {
      router.push(item.path);
    }
    setShow(false);
  };

  const handleNavigate = () => {
    if (!item.children) {
      setShow(false);
      router.push(`${item.path}`);
    }
  };
  return (
    <div className="border-b-[1px] border-gray-200 py-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleSelectMenuItem}
      >
        <div
          className={`font-semibold ${
            router.pathname === item.path ? "text-primary" : "text-info"
          }`}
          onClick={handleNavigate}
        >
          {item.title}
        </div>
        {item.children && (
          <i
            className={`fa-regular fa-chevron-right ${
              openMenuItem
                ? "rotate-90 transition-all duration-500"
                : "-rotate-90 transition-all duration-200"
            }`}
          ></i>
        )}
      </div>
      {openMenuItem && (
        <div className={styles.menuContent}>
          {item.children &&
            item.children.map((i) => (
              <div
                key={i.id}
                className={"mx-2 my-2.5 cursor-pointer"}
                onClick={() => handleClick(i)}
              >
                <span
                  className={`font-semibold ${
                    router.pathname === i.path ? "text-primary" : "text-info"
                  }`}
                >
                  {" "}
                  {i.title}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DrawerItem;
