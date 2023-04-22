import ChatBox from "@/components/chat/ChatBox";
import ChatItem from "@/components/chat/ChatItem";
import LayoutChat from "@/components/layout/LayoutChat";
import Avatar from "@/components/user/Avatar";
import { ChatAPI } from "apis/chat";
import { userAPI } from "apis/user";
import useWindowSize from "hooks/useWindowSize";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "utils/socket";

const Chat = () => {
  const profile = useSelector((state) => state.auth.profile);
  const [chats, setChats] = useState(1);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isNewChat, setIsNewChat] = useState(null);
  const [receiverUser, setReceiverUser] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { width } = useWindowSize();
  const router = useRouter();

  const [hiddenChat, setHiddenChat] = useState(null);

  //connect socket
  useEffect(() => {
    socket.emit("get-users-online");
    socket.on("get-users-online-array", (data) => {
      setOnlineUsers(data);
    });
  }, []);

  //send message
  useEffect(() => {
    if (sendMessage) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //receive message
  useEffect(() => {
    socket?.on("recieve-message", async (data) => {
      setReceivedMessage(data);
    });
  }, [profile]);

  useEffect(() => {
    if (receivedMessage?.chatId) {
      handlSortChat(receivedMessage.chatId, receivedMessage.content);
    }
  }, [receivedMessage]);

  useEffect(() => {
    (async () => {
      if (profile.id) {
        try {
          const res = await ChatAPI.getuserChats(profile.id);
          if (res) {
            setChats(res);
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [router, profile]);

  useEffect(() => {
    (async () => {
      if (router?.query?.slug) {
        const receiverUserId = router.query.slug;
        const userRes = await userAPI.getProfileById(+receiverUserId);
        setReceiverUser(userRes);
        if (chats?.length) {
          let re = null;
          for (const chat of chats) {
            if (
              chat.userId1 === +receiverUserId ||
              chat.userId2 === +receiverUserId
            ) {
              setSelectedChat(chat);
              setIsNewChat(false);
              re = true;
              break;
            }
          }
          if (!re) {
            setIsNewChat(true);
            const seletedChatTemp = {
              userId1: profile.id,
              userId2: +receiverUserId,
            };
            setSelectedChat({ ...seletedChatTemp });
          }
        } else {
          setIsNewChat(true);
          const seletedChatTemp = {
            userId1: profile.id,
            userId2: +receiverUserId,
          };
          setSelectedChat({ ...seletedChatTemp });
        }
      }
    })();
  }, [chats]);

  const openChat = async (chat) => {
    try {
      setSelectedChat(chat);
      const ids = [chat.userId1, chat.userId2];
      const receiverUserId = ids.find((item) => item != profile.id);
      const userRes = await userAPI.getProfileById(+receiverUserId);
      setReceiverUser(userRes);
      await ChatAPI.markViewedChat(profile.id);
      if (width < 1024) {
        setHiddenChat(true);
      }
      router.push(`/chat/${receiverUserId}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (router && router.asPath === "/chat" && width < 1024) {
      setHiddenChat(false);
    }
  }, [router]);

  const handlSortChat = async (chatId, lastMessage, senderLastMessage) => {
    if (chatId) {
      try {
        const res = await ChatAPI.getChat(chatId);
        const temp = chats.filter((item) => item.id !== chatId);
        setChats([{ ...res, lastMessage, senderLastMessage }, ...temp]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="bg-base-200 h-screen overflow-hidden pt-[74px]">
      <div className="container mx-auto bg-base-100 lg:grid grid-cols-3">
        {!hiddenChat && (
          <div className="col-span-1 border-r-[1px] border-r-base-200 px-2 h-[100vh]">
            <div className={"flex justify-between sticky py-4"}>
              <h3 className="m-0">Chat</h3>
            </div>
            <div>
              {isNewChat && (
                <div className="flex items-center space-x-3 p-2 cursor-pointer bg-base-200 rounded-lg">
                  <Avatar sizeAvatar="w-14" avatar={receiverUser?.avatar} />
                  <div className="flex flex-col flex-1">
                    <div className="text-info text-sm font-bold">
                      {receiverUser?.displayName}
                    </div>
                  </div>
                </div>
              )}
              {chats?.length > 0 && (
                <div className="flex flex-col space-y-4">
                  {chats.map((chat) => (
                    <div key={chat.id} onClick={() => openChat(chat)}>
                      <ChatItem
                        chat={chat}
                        selected={selectedChat?.id === chat.id}
                        currentUserId={profile.id}
                        checkUserOnline={() => {}}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <ChatBox
          user={receiverUser}
          chat={selectedChat}
          currentUserId={profile.id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          handlSortChat={handlSortChat}
        />
      </div>
    </div>
  );
};

Chat.Layout = LayoutChat;
export default Chat;
