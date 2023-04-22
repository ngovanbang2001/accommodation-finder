import React from "react";
import Logo from "../common/Logo";
import { useRouter } from "next/router";
import Drawer from "./DrawerLeft";
import useClickOutside from "hooks/useClickOutside";
import DrawerRight from "./DrawerRight";
import { useSelector } from "react-redux";
import ModalRequireLogin from "../modal/ModalRequireLogin";
import Image from "next/image";
export default function NavbarAdmin() {
  const router = useRouter();
  const profile = useSelector((state) => state.auth.profile);
  const handleLogin = () => {
    const label = document.getElementById("modal-require-login-id");
    label.click();
    router.push(`/sign-in`);
  };
  const handlePostNew = () => {
    if (profile.id) {
      router.push(`/post/create-post`);
    } else {
      const label = document.getElementById("modal-require-login-id");
      label.click();
    }
  };

  const {
    show: showDrawer,
    setShow: setShowDrawer,
    nodeRef,
  } = useClickOutside();

  const {
    show: showDrawerRight,
    setShow: setShowDrawerRight,
    nodeRef: drawerRightRef,
  } = useClickOutside();

  const openDrawerLeft = () => {
    setShowDrawer(true);
  };

  const openDrawerRight = () => {
    setShowDrawerRight(true);
  };

  return (
    <div className={"shadow-lg w-full sticky top-0 z-20 bg-base-100"}>
      <div className="container flex items-center justify-between">
        <div className="lg:px-0 py-3 px-3 h-fit flex justify-between w-full flex-1 ">
          <div className="flex items-center space-x-3">
            {profile.role === 0 && (
              <i
                className="fa-regular fa-bars text-primary text-xl cursor-pointer block lg:hidden"
                onClick={openDrawerLeft}
              ></i>
            )}
            <Logo />
          </div>
          <div className="lg:hidden block">
            {profile?.avatar ? (
              <div
                className="h-[32px] w-[32px] relative cursor-pointer "
                onClick={openDrawerRight}
              >
                <Image
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  src={profile.avatar}
                  className="rounded-full"
                />
              </div>
            ) : (
              <i
                className="fa-light fa-circle-user text-primary text-[32px] block lg:hidden cursor-pointer"
                onClick={openDrawerRight}
              ></i>
            )}
          </div>
        </div>
      </div>
      <Drawer ref={nodeRef} show={showDrawer} setShow={setShowDrawer} />
      <DrawerRight
        ref={drawerRightRef}
        show={showDrawerRight}
        setShow={setShowDrawerRight}
      />
      <ModalRequireLogin id={"modal-require-login"} handleClick={handleLogin} />
    </div>
  );
}
