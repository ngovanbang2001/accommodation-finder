import * as React from "react";
export default function TitlePostItem({ children, className }) {
  return <div className={`m-0 line-clamp-2 ${className}`}>{children}</div>;
}
