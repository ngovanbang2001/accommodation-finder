import React, { useEffect, useState } from "react";

import Image from "next/image";
import Dot from "../common/Dot";
import PropTypes from "prop-types";
import { categoryTitleConfig } from "configs/configs";
import { strToSlug } from "utils/common";
import { useRouter } from "next/router";
import PostTag from "./PostTag";
import { useDispatch, useSelector } from "react-redux";
import { PostAPI } from "apis/post";
import { updateFavoritePosts } from "store/post/post-slice";
import { toast } from "react-toastify";
import PostInfo from "./detail-post/PostInfo";

export default function HomePostItem({ item, user = {} }) {
  const favoritePosts = useSelector((state) => state.post.favoritePosts);
  const profile = useSelector((state) => state.auth.profile);
  const [isFavorite, setIsFavorite] = useState(null);
  const [showHeart, setShowHeart] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${strToSlug(item.title)}-${item.id}`);
  };
  useEffect(() => {
    if (profile.id) {
      if (profile.id != item.userId) {
        setShowHeart(true);
      } else {
        setShowHeart(false);
      }
    }
  }, [profile]);
  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (profile.id) {
      const res = await PostAPI.toggleFavorite({
        userId: profile.id,
        postId: item.id,
      });
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        const array = favoritePosts.filter((i) => i.post.id !== item.id);
        dispatch(updateFavoritePosts(array));
      } else {
        let temp = [...favoritePosts];
        temp.push({ post: item, userFavorite: profile });
        dispatch(updateFavoritePosts(temp));
      }
      if (res.ok) {
        toast.success("Cập nhật thông tin thành công!", {
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
        toast.error("Đã có lỗi xảy ra!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      const modal = document.getElementById("modal-require-login");
      if (modal) {
        modal.click();
      }
    }
  };

  useEffect(() => {
    if (favoritePosts) {
      const post = favoritePosts.find((i) => i.post.id === item.id);
      if (post) {
        setIsFavorite(true);
      }
    }
  }, []);

  return (
    <div
      className="md:w-[372px] w-[360px] mx-3 h-[440px] box-border rounded-xl relative shrink-0 bg-base-100 cursor-pointer mb-2 box-shadow"
      onClick={handleClick}
    >
      <div className="relative w-full h-[180px]">
        <Image
          src={item.images[0]}
          alt="thumbnail image"
          layout={"fill"}
          placeholder={"blur"}
          blurDataURL={item.images[0]}
          objectFit={"cover"}
          className={"rounded-tl-xl rounded-tr-xl"}
        />
        <PostTag
          tag={categoryTitleConfig[item.category]}
          category={item.category}
        />
        {showHeart && (
          <div
            className="cursor-pointer absolute top-2 right-1 p-2 rounded-full bg-slate-700 bg-opacity-50 h-[36px] w-[36px] flex items-center justify-center"
            onClick={(e) => handleFavorite(e)}
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart text-[#f9595f] text-2xl"></i>
            ) : (
              <i className="fa-light fa-heart text-2xl text-white"></i>
            )}
          </div>
        )}
      </div>
      <PostInfo item={item}/>
    </div>
  );
}

HomePostItem.propTypes = {
  item: PropTypes.object.isRequired,
};
