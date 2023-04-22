import Avatar from "@/components/user/Avatar";
import DetailUserInfoContainer from "@/components/user/DetailUserInfoContainer";
import FullName from "@/components/user/FullName";
import React, { useState, useEffect, Fragment } from "react";
import { userAPI } from "apis/user";
import { PostAPI } from "apis/post";
import { useRouter } from "next/router";
import ProfileSekeleton from "@/components/Sekeleton/ProfileSekeleton";
import CoverImageSection from "@/components/user/CoverImageSection";
import PostsSection from "@/components/user/PostsSection";
import { useSelector } from "react-redux";
import ModalRequireLogin from "@/components/modal/ModalRequireLogin";
export default function ProfileUser() {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const profileMe = useSelector((state) => state.auth.profile);
  useEffect(() => {
    (async () => {
      if (router?.query?.slug) {
        try {
          setLoading(true);
          const id = router.query.slug.split("-").slice(-1);
          const res = await PostAPI.getPostsByUser({
            userId: id,
            offset: 0,
            limit: 20,
            status: 1,
            isActive: 1,
          });
          const profileRes = await userAPI.getProfileById(id);
          setLoading(false);
          setProfile(profileRes);
          setPosts(res.posts);
        } catch (e) {
          setLoading(false);
          console.log(e);
        }
      }
    })();
  }, [router.query]);

  const handleChat = () => {
    if (profileMe.id) {
      router.push(`/chat/${profile.id}`);
    } else {
      const modal = document.getElementById("modal-require-login");
      if (modal) {
        modal.click();
      }
    }
  };
  return (
    <Fragment>
      {profile.id && !loading ? (
        <div>
          <div className="bg-base-100">
            <div className="container mx-auto bg-base-100">
              <CoverImageSection
                imgCover={profile.imageCover}
                userId={profile.id}
                avatar={profile.avatar}
                showIconUpload={false}
              />
              <div className={"relative w-full"}>
                <div
                  className={
                    "absolute lg:left-10 left-2/4 lg:-translate-x-0 -translate-x-2/4 -top-1/2 -translate-y-2/4 z-10"
                  }
                >
                  <Avatar
                    sizeAvatar={"md:w-[160px] md:h-[160px] w-[130px] h-[130px]"}
                    isShowUploadIcon={false}
                    avatar={profile.avatar}
                  />
                </div>
              </div>
              <div className="lg:mt-5 md:mt-24 mt-20 lg:ml-[230px] lg:w-fit w-full flex items-center justify-center">
                <FullName
                  // fullName={profile.displayName}
                  fullName={profile.displayName}
                  className={"lg:text-3xl text-2xl block"}
                ></FullName>
              </div>
              <div className="flex justify-end cursor-pointer">
                <div
                  className="flex space-x-1 items-center px-2 py-1 border border-primary rounded text-primary "
                  onClick={handleChat}
                >
                  <i className="fa-regular fa-comment-lines"></i>
                  <span>Nhắn tin</span>
                </div>
              </div>
              <div className="divider"></div>
            </div>
          </div>
          <div className="bg-base-200">
            <div className="grid-cols-3 lg:grid lg:space-x-5 lg:p-4 lg:px-0 container mx-auto">
              <div className="col-span-1 h-fit">
                <DetailUserInfoContainer
                  profile={profile}
                  showBanlance={false}
                />
              </div>
              <div className="col-span-2 lg:px-0 px-2 pb-2">
                <div className="p-2 rounded-lg box-shadow items-center flex justify-between bg-base-100 cursor-pointer lg:mt-0 lg:my-4 my-2">
                  <span className="md:text-xl font-bold">
                    Tin đăng đang hiển thị
                  </span>
                </div>
                <PostsSection userId={profile.id} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileSekeleton />
      )}
      <ModalRequireLogin id={"modal-require-login"} />
    </Fragment>
  );
}
