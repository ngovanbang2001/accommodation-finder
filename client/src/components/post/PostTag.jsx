import * as React from "react";
import styles from "./HomePostItem.module.scss";
export default function PostTag({ icon, tag, category, classCustom="" }) {
  const getBackground = () => {
    switch (category) {
      case 1: {
        return `bg-red-400`;
      }
      case 2: {
        return `bg-orange-400`;
      }
      case 3: {
        return `bg-green-400`;
      }
      case 4: {
        return `bg-primary`;
      }
    }
  };
  return (
    <div
      className={`${classCustom} ${getBackground()} ${
        styles["post-tag"]
      } px-1 rounded-tr-md rounded-br-md rounded-tl-md absolute top-2 -left-3 z-10 text-white`}
    >
      <span className="px-1 text-sm">{tag}</span>
    </div>
  );
}
