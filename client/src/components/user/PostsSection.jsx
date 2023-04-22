import { PostAPI } from "apis/post";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PrimaryPostItem from "../post/PrimaryPostItem";

const PostsSection = ({ userId }) => {
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const res = await PostAPI.getPostsByUser({
            userId,
            offset: offset,
            limit,
            isActive: 1,
            status: 1,
          });
          if (res.total) {
            setPosts(res.posts);
            setTotal(res.total);
            if (res.posts.length === res.total) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [userId]);

  const getMorePost = async () => {
    try {
      const res = await PostAPI.getPostsByUser(offset + limit);
      setOffset(offset + limit);
      if (res.posts.length) {
        setNotifications([...posts, ...res.posts]);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      setHasMore(false);
    }
  };
  return (
    <InfiniteScroll
      dataLength={getMorePost}
      next={getMorePost}
      hasMore={hasMore}
      endMessage={
        <div className="text-sm font-normal text-center mt-4">
          Đã tải hết tin đăng.
        </div>
      }
      loader={<span>Đang tải...</span>}
    >
      {posts.length > 0 &&
        posts.map((item) => <PrimaryPostItem post={item} key={item.id} />)}
    </InfiniteScroll>
  );
};

export default PostsSection;
