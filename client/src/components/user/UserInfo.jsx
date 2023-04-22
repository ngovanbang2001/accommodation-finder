import { useRouter } from "next/router";
import React from "react";
import { strToSlug } from "utils/common";
import Avatar from "./Avatar";
import FullName from "./FullName";
export default function UserInfo({ user, id }) {
  const router = useRouter();
  const handleClick = (e) => {
    e.stopPropagation();
    const slug = strToSlug(user.displayName);
    router.push(`/profile/${slug}-${id}`);
  };
  return (
    <div
      className="flex items-center space-x-1"
      onClick={(e) => handleClick(e)}
    >
      <Avatar sizeAvatar={"w-7"} avatar={user.avatar} />
      <FullName
        fullName={user.displayName}
        className={"text-sm line-clamp-1"}
      />
    </div>
  );
}
