import * as React from "react";
export default function MenuSectionItem({ title, isActive = false }) {
  return (
    <li
      className={`font-semibold text-info relative shrink-0 block ${
        isActive ? `text-gradient` : ""
      }`}
    >
      {title}
    </li>
  );
}
