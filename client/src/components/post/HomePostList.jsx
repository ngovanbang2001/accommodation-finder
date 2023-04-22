import { PostAPI } from "apis/post";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import TitleSection from "../common/TitleSection";
import HomePostItem from "./HomePostItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import PostSekeleton from "../Sekeleton/PostSekeleton";
export default function HomePostList({ title, category }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await PostAPI.getAllPost({
          offset: 0,
          limit: 20,
          status: 1,
          isActive: 1,
          category,
          tradingForm: 1,
        });
        setPosts(res.postData);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <div className="pb-8 padding-mobile">
        {loading ? (
          <Fragment>
            <div className="flex items-center justify-center">
              <div
                className={
                  "animate-pulse h-6 w-[250px] bg-slate-200 rounded-lg my-2"
                }
              ></div>
            </div>
            <div className="pt-4">
              <div className="grid grid-cols-3 space-x-5">
                <PostSekeleton />
                <PostSekeleton />
                <PostSekeleton />
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="pt-4">
            <TitleSection title={title} />
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
            >
              {posts.length > 0 &&
                posts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <HomePostItem item={item} key={item.id} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}
