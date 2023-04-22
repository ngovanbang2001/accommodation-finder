import { ChatAPI } from 'apis/chat'
import { MessageAPI } from 'apis/message'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Avatar from '../user/Avatar'
import { convertBase64 } from 'utils/uploadImage'
import Lightbox from 'yet-another-react-lightbox'
import { BigPlayButton, ControlBar, Player } from 'video-react'
import ChatInput from './ChatInput'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { strToSlug } from 'utils/common'
import { toast } from 'react-toastify'

const ChatBox = ({ chat, currentUserId, receivedMessage, setSendMessage, handlSortChat, user }) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [soureImage, setSoureImage] = useState(null)
  const [soureVideo, setSoureVideo] = useState(null)
  const [base64, setBase64] = useState(null)
  const [base64Video, setBase64Video] = useState(null)
  const [openLightBox, setOpenLightBox] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const router = useRouter()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)

  const [chatID, setChatID] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const handleClick = (index) => {
    setOpenLightBox(true)
    setPhotoIndex(index)
  }
  useEffect(() => {
    ;(async () => {
      if (chat?.id) {
        setHasMore(true)
        setOffset(0)
        try {
          const resMess = await MessageAPI.getMessages({
            id: chat.id,
            query: { offset: 0, limit },
          })
          if (resMess.rows && resMess.rows.length) {
            setMessages(resMess.rows)
            if (resMess.rows.length < limit) {
              setHasMore(false)
            }
          } else {
            setMessages([])
            setHasMore(false)
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        setMessages([])
      }
    })()
  }, [chat?.id])

  useEffect(() => {
    if (
      receivedMessage &&
      ((receivedMessage.senderId === chat.userId1 && currentUserId === chat.userId2) ||
        (receivedMessage.senderId === chat.userId2 && currentUserId === chat.userId1))
    ) {
      setMessages([receivedMessage, ...messages])
    }
  }, [receivedMessage])

  const handleChangeInput = (e) => {
    setMessage(e.target.value)
  }

  const handleUploadImages = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (e.target.files[0].size > 5 * 1048576) {
        toast.error('Kích thước ảnh tối đa 5MB!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      } else {
        const base64 = await convertBase64(file)
        if (base64) {
          setBase64(base64)
          setSoureImage(URL.createObjectURL(file))
        }
      }
    }
  }

  const handleUploadVideo = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.size > 25 * 1048576) {
        toast.error('Kích thước video tối đa 25MB!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      } else {
        const base64 = await convertBase64(file)
        if (base64) {
          setBase64Video(base64)
          setSoureVideo(URL.createObjectURL(file))
        }
      }
    }
  }

  const handleSendMessage = async () => {
    try {
      let msg = null
      if (chat.id || chatID) {
        msg = {
          chatId: chat.id ? chat.id : chatID,
          senderId: currentUserId,
          content: message,
        }
      } else {
        const res = await ChatAPI.createChat({
          senderId: chat.userId1,
          recevierId: chat.userId2,
        })
        setChatID(res.id)
        msg = {
          chatId: res.id,
          senderId: currentUserId,
          content: message,
        }
      }
      let lastMessage = null
      if (message) {
        lastMessage = message
      }
      if (soureImage) {
        msg.image = base64
        lastMessage = 'Đã gửi file đa phương tiện'
      }
      if (soureVideo) {
        msg.video = base64Video
        lastMessage = 'Đã gửi file đa phương tiện'
      }
      setMessages([msg, ...messages])
      setMessage('')
      handlSortChat(chat.id, lastMessage, currentUserId)
      const data = await MessageAPI.sendMessage(msg)
      if (data) {
        setMessages([data, ...messages])
        setSoureVideo('')
        setSoureImage('')
        setSendMessage({ ...data, receiverId: user?.id })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleLoadMoreMessages = async () => {
    try {
      const res = await MessageAPI.getMessages({
        query: { offset: offset + limit, limit },
        id: chat.id,
      })
      if (res.rows.length) {
        setOffset(offset + limit)
        setMessages([...messages, ...res.rows])
      } else {
        setHasMore(false)
      }
    } catch (e) {
      console.log(e)
      setHasMore(false)
    }
  }

  const handleShowProfile = () => {
    const slug = strToSlug(user.displayName)
    router.push(`/profile/${slug}-${user.id}`)
  }
  return (
    <div className="col-span-2 relative w-full">
      {user && (
        <div className="border-b-[2px] border-b-base-200 flex items-center justify-between sticky bg-white">
          <div
            className="flex items-center space-x-2 p-2 cursor-pointer"
            onClick={handleShowProfile}
          >
            <Avatar sizeAvatar="w-12" avatar={user?.avatar} />
            <div className="flex flex-col pl-2">
              <span className="font-bold text-info">{user.displayName}</span>
            </div>
          </div>
        </div>
      )}
      <div
        id="scrollableDiv"
        style={{
          height: '100vh',
          overflow: 'auto',
          display: hasMore ? 'flex' : 'block',
          flexDirection: hasMore ? 'column-reverse' : 'unset',
        }}
      >
        {messages?.length > 0 && (
          <div className="mb-[368px]">
            <InfiniteScroll
              inverse={true}
              scrollableTarget="scrollableDiv"
              hasMore={hasMore}
              dataLength={messages}
              next={handleLoadMoreMessages}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
              loader={<h4 className="text-center">Đang tải...</h4>}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 flex flex-col ${
                    message.senderId === user?.id ? '' : 'justify-end'
                  }`}
                >
                  {message.content && (
                    <div
                      className={`${
                        message.senderId === user?.id
                          ? 'seft-left text-colorIconMenu bg-backgroundGray  rounded-full rounded-bl-lg'
                          : 'rounded-full rounded-br-lg self-end text-white bg-primary'
                      }  py-1.5 px-2 text-sm w-fit mb-1`}
                    >
                      {message.content}
                    </div>
                  )}

                  {message.image && (
                    <div
                      className={`w-fit ${
                        message.senderId !== user?.id ? 'self-end' : 'self-start'
                      } cursor-pointer`}
                      onClick={() => handleClick(message.image)}
                    >
                      <div className="border border-gray-200 rounded-lg">
                        <Image
                          src={message.image}
                          alt=""
                          width={200}
                          height={200}
                          placeholder={'blur'}
                          blurDataURL={message.image}
                          objectFit={'cover'}
                        />
                      </div>
                    </div>
                  )}

                  {message.video && (
                    <div
                      className={`overflow-hidden h-[200px] w-[400px] ${
                        message.senderId !== user?.id ? 'self-end' : 'self-start'
                      } `}
                    >
                      <Player
                        playsInline
                        src={message.video}
                        className={'h-[250px]'}
                        poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
                      >
                        <ControlBar autoHide={false} className="my-class" />
                        <BigPlayButton position="center" />
                      </Player>
                    </div>
                  )}
                  {!message.createdAt && message.senderId !== user?.id && (
                    <div className="fa-regular fa-circle text-[9px] text-primary self-end"></div>
                  )}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>

      {user?.id && (
        <ChatInput
          setSoureImage={setSoureImage}
          setSoureVideo={setSoureVideo}
          soureImage={soureImage}
          soureVideo={soureVideo}
          message={message}
          setMessage={setMessage}
          handleUploadVideo={handleUploadVideo}
          handleSendMessage={handleSendMessage}
          handleUploadImages={handleUploadImages}
        />
      )}
      {openLightBox && (
        <Lightbox mainSrc={photoIndex} onCloseRequest={() => setOpenLightBox(false)} />
      )}
    </div>
  )
}

export default ChatBox
