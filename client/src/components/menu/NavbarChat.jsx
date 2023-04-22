import { ChatAPI } from "apis/chat";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "utils/socket";

const NavbarChat = () => {
  const profile = useSelector((state) => state.auth.profile);
  const [totalChatNewMessage, setTotalChatNewMessage] = useState(0);
  const router = useRouter();
  const getNumberNewChat = async () => {
    try {
      if (!router.asPath.includes("chat")) {
        const res = await ChatAPI.getNumberNewChat(profile.id);
        if (res) {
          setTotalChatNewMessage(res.total);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => {
      if (profile) {
        getNumberNewChat();
      }
      socket?.on("recieve-message", async (data) => {
        getNumberNewChat();
      });
    })();
  }, [profile]);

  return (
    <div
      className="user-menu nav-item font-bold cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full bg-backgroundGray relative"
      onClick={() => {
        setTotalChatNewMessage(0);
        router.push("/chat");
      }}
    >
      <i className="fa-regular fa-comment-lines text-colorIconMenu text-lg"></i>
      {totalChatNewMessage > 0 && (
        <div className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs h-[20px] w-[20px] flex items-center justify-center">
          {totalChatNewMessage < 10 ? totalChatNewMessage : "9+"}
        </div>
      )}
    </div>
  );
};

export default NavbarChat;
