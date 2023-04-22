import React, { useEffect, useState } from "react";
import Dot from "../common/Dot";
import Avatar from "../user/Avatar";
import PropTypes from "prop-types";
import { async } from "@firebase/util";
import { userAPI } from "apis/user";
import { ChatAPI } from "apis/chat";
import { MessageAPI } from "apis/message";
import MessageItem from "./MessageItem";
import SentMessageItem from "./SentMessageItem";
import { useSelector } from "react-redux";
import { auth } from "configs/firebaseConfig";
export default function ChatItem({
  chat,
  currentUserId,
  checkUserOnline,
  selected,
}) {
  const [receiverUser, setReceiverUser] = useState({});
  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    (async () => {
      const ids = [chat.userId1, chat.userId2];
      const receiverUserId = ids.find((userId) => userId != currentUserId);
      try {
        const res = await userAPI.getProfileById(receiverUserId);
        setReceiverUser(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div
      className={`flex items-center space-x-3 p-2 cursor-pointer hover:bg-base-200 rounded-lg ${
        selected ? "bg-base-200" : ""
      }`}
    >
      <div className="flex items-center space-x-3 justify-between w-full">
        <div className="flex items-center space-x-3">
          <Avatar sizeAvatar="w-14" avatar={receiverUser.avatar} />
          <div className="flex flex-col flex-1">
            <div className="text-info text-sm font-bold">
              {receiverUser.displayName}
            </div>
            <div>
              {chat.senderLastMessage === currentUserId ? (
                <div className="text-sm">Bạn: {chat.lastMessage}</div>
              ) : (
                <div
                  className={`${
                    chat.isUser2NewChat || chat.isUser1NewChat
                      ? "text-primary font-semibold "
                      : ""
                  } text-sm line-clamp-1`}
                >
                  {chat.lastMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {(chat.isUser2NewChat || chat.isUser1NewChat) &&
        chat.senderLastMessage !== profile.id ? (
          <div className={`bg-primary h-2 w-2 rounded-full`}></div>
        ) : null}
      </div>
    </div>
  );
}

ChatItem.propTypes = {
  chat: PropTypes.object,
  currentUserId: PropTypes.number,
};
