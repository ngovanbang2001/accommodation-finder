import { MenuItem } from "@szhsin/react-menu";
import { notificationAPI } from "apis/notification";
import thumbnail from "@/assets/images/thumb.png";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import { useRouter } from "next/router";
import React, { useState } from "react";
import Avatar from "../user/Avatar";
import Image from "next/image";
export default function NotificationITem({ notification }) {
  const router = useRouter();
  const handleClick = () => {
    handleMarkRead();
    router.push(notification.directLink);
  };

  const handleMarkRead = async () => {
    if (!notification.isRead) {
      try {
        const res = await notificationAPI.markRead(notification.id);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <MenuItem
      onClick={handleClick}
      className="!flex items-center space-x-3 py-2 !justify-between !px-0"
    >
      <div className="flex items-start space-x-3 px-1">
        {!notification.isRead ? (
          <div className="w-[5px] h-[5px] bg-primary rounded-full"></div>
        ) : (
          <div className="w-[5px]"></div>
        )}
        <div className="flex-1">
          {notification.type === 1 ? (
            <Avatar
              sizeAvatar="w-12"
              avatar={notification.userNotification.avatar}
            />
          ) : (
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <Image
                src={thumbnail}
                alt={"thumbnail"}
                layout={"fill"}
                objectFit={"cover"}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div
            dangerouslySetInnerHTML={{ __html: notification.content }}
            className="text-sm font-normal line-clamp-3"
          ></div>
          <span className="text-xs font-normal">
            {moment(notification.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </MenuItem>
  );
}
