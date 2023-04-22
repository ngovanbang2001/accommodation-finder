import like from "@/assets/images/interactive/like.svg";
import commentImg from "@/assets/images/interactive/comment.svg";
import share from "@/assets/images/interactive/share.svg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CommentBox from "@/components/comment/CommentBox";
import { useSelector } from "react-redux";
import { commentAPI } from "apis/comment";
import { convertBase64 } from "utils/uploadImage";
import CommentItem from "../comment/CommentItem";
import Link from "next/link";
import { toast } from "react-toastify";
const interactives = [
  { id: 1, title: "Thích", icon: like },
  { id: 2, title: "Bình luận", icon: commentImg },
  { id: 3, title: "Chia sẻ", icon: share },
];

export default function InteractiveContainer({ postId }) {
  const profile = useSelector((state) => state.auth.profile);

  const [limit, setLimit] = useState(5);
  const [totalComment, setTotalComment] = useState(null);
  const [page, setPage] = useState(1);

  //comment
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [base64Image, setBase64Image] = useState(null);
  const [base64Video, setBase64Video] = useState(null);

  const [imageURL, setImageURL] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const [loading, setLoading] = useState(false);
  const handlePostComment = async () => {
    try {
      setLoading(true);
      const res = await commentAPI.postComment({
        postId,
        userId: profile.id,
        content: comment,
        base64Image,
        base64Video,
      });
      setLoading(false);
      if (res) {
        setComment("");
        setImageURL("");
        setVideoURL("");
        setBase64Image(null);
        setBase64Video(null);
        setTotalComment(totalComment + 1);
        setComments([{ ...res, isEdit: true, isDelete: true }, ...comments]);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handlePostCommentReply = async (
    parentId,
    content,
    imageBase64,
    videoBase64,
    imageURL,
    videoURL,
    owner
  ) => {
    try {
      const temp = comments.map((comment) => {
        if (comment.id === parentId) {
          const { firstChild } = comment;
          const { id, avatar, displayName } = profile;
          const temp = {
            content,
            imageAttach: imageURL,
            videoAttach: videoURL,
            userComment: { id, avatar, displayName },
          };
          return {
            ...comment,
            firstChild: firstChild ? [temp, ...firstChild] : [temp],
          };
        }
        return comment;
      });
      setComments([...temp]);
      const res = await commentAPI.postCommentReply({
        parentId,
        userId: profile.id,
        content,
        videoBase64,
        imageBase64,
        owner,
        postId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateComment = async (
    item,
    commentEditInput,
    imageBase64,
    imageURL,
    videoBase64,
    videoURL
  ) => {
    try {
      const temps = comments.map((comment) => {
        if (comment.id === item.id) {
          return {
            ...comment,
            content: commentEditInput,
            imageAttach: imageURL,
            videoAttach: videoURL,
          };
        } else {
          return {
            ...comment,
            firstChild: comment.firstChild
              ? comment.firstChild.map((childComment) => {
                  if (childComment.id === item.id) {
                    return {
                      ...childComment,
                      content: commentEditInput,
                      imageAttach: imageURL,
                      videoAttach: videoURL,
                    };
                  }
                  return childComment;
                })
              : null,
          };
        }
      });
      setComments([...temps]);
      const res = await commentAPI.updateComment({
        commentId: item.id,
        contentUpdate: commentEditInput,
        imageBase64,
        videoBase64,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowMoreReplyComment = async (replyComments, commentId) => {
    const temp = comments.map((comment) => {
      if (comment.id === commentId) {
        const filteredArray = comment.firstChild.filter((item1) => {
          return !replyComments.some(
            (item2) => item2.content === item1.content
          );
        });
        comment.firstChild = [...filteredArray, ...replyComments];
      }
      return comment;
    });
    setComments([...temp]);
  };

  const handleShowMoreComment = async () => {
    try {
      const res = await commentAPI.getComments({
        postId,
        offset: page * limit,
        limit,
      });
      if (res.comments) {
        setComments([...comments, ...res.comments]);
        setPage(page + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteComment = (cmt) => {
    if (!cmt.parentId) {
      setTotalComment(totalComment - 1);
    }
    let temps = [];
    if (cmt.parentId === 0) {
      temps = comments.filter((comment) => comment.id !== cmt.id);
    } else {
      temps = comments.map((comment) => {
        const { firstChild } = comment;
        return {
          ...comment,
          totalReply: comment.totalReply - 1,
          firstChild: firstChild
            ? firstChild.filter((item) => item.id !== cmt.id)
            : null,
        };
      });
    }
    setComments([...temps]);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await commentAPI.getComments({
          postId,
          offset: 0,
          limit,
        });
        if (res.comments) {
          setPage(1);
          setComments(res.comments);
          setTotalComment(res.total);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [postId]);

  const handleChangeInputUploadImage = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      if (e.target.files[0].size > 5 * 1048576) {
        toast.error("Kích thước ảnh tối đa 5MB!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setBase64Image(await convertBase64(e.target.files[0]));
        setImageURL(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const handleChangeInputUploadVideo = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      if (e.target.files[0].size > 25 * 1048576) {
        toast.error("Kích thước video tối đa 25MB!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setBase64Video(await convertBase64(e.target.files[0]));
        setVideoURL(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  return (
    <div>
      <h3>Bình luận</h3>
      {profile.id ? (
        <CommentBox
          postId={postId}
          profile={profile}
          comment={comment}
          setComment={setComment}
          imageURL={imageURL}
          videoURL={videoURL}
          setImageURL={setImageURL}
          setVideoURL={setVideoURL}
          handleChangeInput={handleChangeInputUploadImage}
          handleChangeVideoInput={handleChangeInputUploadVideo}
          handlePostComment={handlePostComment}
          loading={loading}
        />
      ) : (
        <Link href={"/sign-in"}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <i class="fa-regular fa-circle-user text-3xl"></i>
            <div>Đăng nhập để bình luận.</div>
          </div>
        </Link>
      )}
      <div>
        {comments?.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.id}
            profile={profile}
            handleDeleteComment={handleDeleteComment}
            handlePostCommentReply={handlePostCommentReply}
            handlePostComment={handlePostComment}
            handleShowMoreReplyComment={handleShowMoreReplyComment}
            handleUpdateComment={handleUpdateComment}
            setComments={setComments}
            setComment={setComment}
            totalReplyProp={comment.totalReply}
          />
        ))}
        {totalComment > comments.length && (
          <div
            className="pl-12 py-2 text-primary text-sm  text-center cursor-pointer"
            onClick={handleShowMoreComment}
          >
            Xem thêm bình luận
          </div>
        )}
      </div>
    </div>
  );
}
