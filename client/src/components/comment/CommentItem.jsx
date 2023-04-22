import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import { commentAPI } from 'apis/comment'
import { userAPI } from 'apis/user'
import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { convertBase64 } from 'utils/uploadImage'
import CommentInput from './CommentInput'
import ModalComfirmDeleteComment from '../modal/ModalComfirmDeleteComment'
import camera from '@/assets/images/camera.png'
import Avatar from '../user/Avatar'
import { BigPlayButton, ControlBar, Player } from 'video-react'
import CommentBoxReply from './CommentBoxReply'
import { toast } from 'react-toastify'
export default function CommentItem({
  comment,
  profile,
  setComment,
  setComments,
  handleDeleteComment: handleDeleteCommentProp,
  handleShowMoreReplyComment: showMoreReplyComment,
  handleUpdateComment: handleUpdateCommentProp,
  handlePostCommentReply,
  totalReplyProp,
}) {
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentEditInput, setCommentEditInput] = useState()
  const [newComment, setNewComment] = useState('')
  const [showEditCommentInput, setShowEditCommentInput] = useState(false)
  const [showModalComfirmDelete, setShowModalComfirmDelete] = useState(false)
  const [totalReply, setTotalReply] = useState(null)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const [openLightBox, setOpenLightBox] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [videoURL, setVideoURL] = useState('')

  const [loadMoreReply, setLoadMoreReply] = useState(comment?.firstChild?.length > 1 ? true : false)
  const [imageBase64, setImageBase64] = useState(null)
  const [videoBase64, setVideoBase64] = useState(null)
  const [isClickShowMore, setIsClickShowMore] = useState(false)
  const [loading, setLoading] = useState(null)
  const toggleShowCommentInput = () => {
    setShowCommentInput(!showCommentInput)
    setImageURL('')
    setVideoURL('')
    setImageBase64(null)
    setVideoBase64(null)
  }

  useEffect(() => {
    if (comment.firstChild) {
    }
  }, [comment])

  useEffect(() => {
    if (comment.firstChild) {
      setTotalReply(totalReplyProp)
      if (totalReplyProp > 1) {
        setLoadMoreReply(true)
      } else if (totalReplyProp === totalReply && totalReply > 1 && !isClickShowMore) {
        setLoadMoreReply(true)
      } else {
        setLoadMoreReply(false)
      }
    }
  }, [comment])

  useEffect(() => {
    ;(async () => {
      if (comment.imageAttach) {
        setImageURL(comment.imageAttach)
      }
      if (comment.videoAttach) {
        setVideoURL(comment.videoAttach)
      }
    })()
  }, [comment])

  const handleShowEdit = () => {
    setCommentEditInput(comment.content)
    setShowEditCommentInput(!showEditCommentInput)
  }

  const handleUpdateComment = async () => {
    try {
      setLoading(true)
      const res = handleUpdateCommentProp(
        comment,
        commentEditInput,
        imageBase64,
        imageURL,
        videoBase64,
        videoURL
      )
      setLoading(false)
      setShowEditCommentInput(!showEditCommentInput)
    } catch (e) {
      console.log(e)
    }
  }

  const handleShowMoreReplyComment = async () => {
    let res = null
    setIsClickShowMore(true)
    if (comment?.firstChild?.length === 1) {
      res = await commentAPI.getReplyComment({
        commentId: comment.id,
        offset: 0,
        limit,
      })
    } else {
      res = await commentAPI.getReplyComment({
        commentId: comment.id,
        offset,
        limit,
      })
    }
    if (res.replyComments.length > 0) {
      showMoreReplyComment([...res.replyComments], comment.id)
      setOffset(offset + limit)
      if (totalReply > comment.firstChild.length && res.replyComments.length === limit) {
        setLoadMoreReply(true)
      } else {
        setLoadMoreReply(false)
      }
    }
  }

  const postCommentReply = (parentId, content) => {
    setShowCommentInput(!showCommentInput)
    handlePostCommentReply(
      parentId,
      content,
      imageBase64,
      videoBase64,
      imageURL,
      videoURL,
      comment.userId
    )
    setNewComment('')
  }

  const handleDeleteComment = async () => {
    try {
      const res = await commentAPI.deleteComment(comment.id)
      if (res.ok) {
        handleDeleteCommentProp(comment)
        setOffset(offset - 1)
        const modal = document.getElementById('modal-delete-cmt')
        if (modal) {
          modal.click()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleChangeInput = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
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
        setImageBase64(await convertBase64(e.target.files[0]))
        setImageURL(URL.createObjectURL(e.target.files[0]))
      }
    }
  }

  const handleChangeVideoInput = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      if (e.target.files[0].size > 25 * 1048576) {
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
        setVideoBase64(await convertBase64(e.target.files[0]))
        setVideoURL(URL.createObjectURL(e.target.files[0]))
      }
    }
  }
  return (
    <div className="pl-3">
      <div className={'flex items-start space-x-3 py-2'}>
        <Avatar
          sizeAvatar="w-12"
          avatar={comment.userId === profile?.id ? profile.avatar : comment?.userComment?.avatar}
        />
        <div
          className={`py-3 px-2 bg-base-200 rounded-lg ${
            showEditCommentInput ? 'w-full' : 'w-fit'
          }`}
        >
          <div className={'flex items-center space-x-2 justify-between'}>
            <div className="flex items-center space-x-1">
              <span className={'font-bold text-primary'}>
                {comment.userId === profile?.id
                  ? profile.displayName
                  : comment?.userComment?.displayName}
              </span>
              <span className={'text-xs text-gray-400'}>{moment(comment.createdAt).fromNow()}</span>
            </div>

            <Fragment>
              {comment.isEdit && (
                <Menu
                  menuButton={
                    <MenuButton>
                      <i className="fa-regular fa-ellipsis"></i>
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem onClick={handleShowEdit}>
                    <span>Chỉnh sửa</span>
                  </MenuItem>
                  <MenuItem onClick={() => setShowModalComfirmDelete(!showModalComfirmDelete)}>
                    <label htmlFor="modal-comfirm-delete" className="cursor-pointer w-full">
                      Xóa
                    </label>
                  </MenuItem>
                </Menu>
              )}
            </Fragment>
          </div>
          {!showEditCommentInput ? (
            <div className={'py-1'}>
              <p className={''}>{comment.content}</p>
              <div className="flex items-center space-x-5">
                {comment.imageAttach && (
                  <Fragment>
                    <div
                      className="relative w-[120px] h-[120px] cursor-pointer "
                      onClick={() => setOpenLightBox(true)}
                    >
                      <Image
                        alt="img"
                        src={comment.imageAttach}
                        layout={'fill'}
                        objectFit={'cover'}
                        className={'rounded-lg'}
                      />
                    </div>
                    {openLightBox && (
                      <Lightbox
                        mainSrc={comment.imageAttach}
                        onCloseRequest={() => setOpenLightBox(false)}
                      />
                    )}
                  </Fragment>
                )}
                {comment.videoAttach && (
                  <div className="h-[150px] w-[250px] relative">
                    <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
                      <Player
                        playsInline
                        src={videoURL}
                        className={'h-[150px]'}
                        poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
                      >
                        <ControlBar autoHide={false} className="my-class" />
                        <BigPlayButton position="center" />
                      </Player>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <CommentInput comment={commentEditInput} setComment={setCommentEditInput} />
              {imageURL && (
                <div className={'relative w-fit rounded-lg mt-2'}>
                  <Image src={imageURL} alt="not found" objectFit="cover" width={100} height={75} />
                  <div
                    className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                    onClick={() => {
                      setImageURL('')
                    }}
                  >
                    <i className="fa-regular fa-xmark text-white text-sm"></i>
                  </div>
                </div>
              )}

              {videoURL && (
                <div className="h-[100px] w-[150px] relative">
                  <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
                    <Player
                      playsInline
                      src={videoURL}
                      className={'h-[150px]'}
                      poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
                    >
                      <ControlBar autoHide={false} className="my-class" />
                      <BigPlayButton position="center" />
                    </Player>
                  </div>
                  <div
                    className="bg-info rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                    onClick={() => setVideoURL('')}
                  >
                    <i className="fa-regular fa-xmark text-white text-sm"></i>
                  </div>
                </div>
              )}
              <div className={'flex justify-between items-center space-x-3 mt-2'}>
                <div
                  className="cursor-pointer text-primary text-sm"
                  onClick={() => setShowEditCommentInput(!showEditCommentInput)}
                >
                  Hủy bỏ
                </div>
                <div className="flex items-center ">
                  <div className={'flex justify-end cursor-pointer items-center'}>
                    <label
                      htmlFor="upload-img-comment-item"
                      className="cursor-pointer flex items-center"
                    >
                      <Image
                        src={camera}
                        alt={'camera'}
                        width={70}
                        height={35}
                        objectFit={'contain'}
                      />
                    </label>

                    <label
                      htmlFor="upload-video-comment-item"
                      className="cursor-pointer flex items-center"
                    >
                      <Image
                        src={camera}
                        alt={'camera'}
                        width={70}
                        height={35}
                        objectFit={'contain'}
                      />
                    </label>
                    <input
                      type={'file'}
                      id={'upload-img-comment-item'}
                      className={'hidden'}
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleChangeInput(e)}
                    />
                    <input
                      type={'file'}
                      id={'upload-video-comment-item'}
                      className={'hidden'}
                      accept=".mov,.mp4"
                      onChange={(e) => handleChangeVideoInput(e)}
                    />
                  </div>
                  <div
                    onClick={handleUpdateComment}
                    className={
                      'cursor-pointer px-3 py-2 bg-primary rounded-lg text-white text-sm font-semibold'
                    }
                  >
                    Cập nhật
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!showEditCommentInput && !comment.parentId && (
        <div className={'ml-14 flex items-center space-x-3 text-sm'}>
          {/* <span>Thích</span>
          <div className={"w-1 h-1 rounded-full bg-gray-400"}></div> */}
          <div className={'cursor-pointer'} onClick={toggleShowCommentInput}>
            {showCommentInput ? (
              <div>
                <div className={'px-2 py-1 rounded-md bg-base-200'}>Hủy</div>
              </div>
            ) : (
              <span>Trả lời</span>
            )}
          </div>
        </div>
      )}
      {showCommentInput && (
        <div className={'ml-14 mt-3 w-full'}>
          <CommentBoxReply
            // profile={profile}
            // comment={newComment}
            // setComment={setNewComment}
            handlePostComment={() => postCommentReply(comment.id, newComment)}
            profile={profile}
            comment={newComment}
            setComment={setNewComment}
            imageURL={imageURL}
            videoURL={videoURL}
            setImageURL={setImageURL}
            setVideoURL={setVideoURL}
            handleChangeInput={handleChangeInput}
            handleChangeVideoInput={handleChangeVideoInput}
            loading={loading}
          />
        </div>
      )}
      {comment?.firstChild ? (
        <Fragment>
          {comment.firstChild.map((item, index) => (
            <div className="pl-12" key={index}>
              <CommentItem
                comment={item}
                handleUpdateComment={handleUpdateCommentProp}
                profile={profile}
                handleDeleteComment={handleDeleteCommentProp}
                setComment={setComment}
                setComments={setComments}
                totalReplyProp={item.totalReply}
              />
            </div>
          ))}
        </Fragment>
      ) : (
        <></>
      )}
      {loadMoreReply && (
        <div
          className="pl-12 py-2 text-primary text-sm cursor-pointer"
          onClick={handleShowMoreReplyComment}
        >
          Xem thêm trả lời
        </div>
      )}

      {showModalComfirmDelete && (
        <ModalComfirmDeleteComment id={'modal-comfirm-delete'} handleClick={handleDeleteComment} />
      )}
    </div>
  )
}
