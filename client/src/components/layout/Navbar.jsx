import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '../common/Logo'
import { useRouter } from 'next/router'
import NavbarUserMenu from '../menu/NavbarUserMenu'
import NavbarServiceMenu from '../menu/NavbarServiceMenu'
import Notification from '../notification/Notification'
import NavbarSeeMoreMenu from '@/components/menu/NavbarSeeMoreMenu'
import Drawer from './DrawerLeft'
import useClickOutside from 'hooks/useClickOutside'
import DrawerRight from './DrawerRight'
import { useSelector } from 'react-redux'
import { roleConfig } from 'configs/configs'
import ModalRequireLogin from '../modal/ModalRequireLogin'
import NavbarPostNew from '../menu/NavbarPostNew'
import Image from 'next/image'
import NavbarChat from '../menu/NavbarChat'
import NavbarRentalMenu from '../menu/NavbarRentalMenu'
import NavbarBuyMenu from '../menu/NavbarBuyMenu'
export default function Navbar() {
  const router = useRouter()
  const profile = useSelector((state) => state.auth.profile)
  const handleLogin = () => {
    const label = document.getElementById('modal-require-login-id')
    label.click()
    router.push(`/sign-in`)
  }
  const handlePostNew = () => {
    if (profile.id) {
      router.push(`/post/create-post`)
    } else {
      const label = document.getElementById('modal-require-login-id')
      label.click()
    }
  }

  const { show: showDrawer, setShow: setShowDrawer, nodeRef } = useClickOutside()

  const {
    show: showDrawerRight,
    setShow: setShowDrawerRight,
    nodeRef: drawerRightRef,
  } = useClickOutside()

  const openDrawerLeft = () => {
    setShowDrawer(true)
  }

  const openDrawerRight = () => {
    setShowDrawerRight(true)
  }

  return (
    <div className={'shadow-lg w-full sticky top-0 z-20 bg-base-100'}>
      <div className="container flex items-center justify-between">
        <div className="lg:px-0 py-3 px-3 h-fit flex justify-between w-full flex-1 ">
          <div className="flex items-center space-x-3">
            <i
              className="fa-regular fa-bars text-primary text-xl cursor-pointer block lg:hidden"
              onClick={openDrawerLeft}
            ></i>
            <Logo />
          </div>
          <div className="lg:hidden block">
            {profile?.avatar ? (
              <div className="h-[32px] w-[32px] relative cursor-pointer " onClick={openDrawerRight}>
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
        <div className="hidden lg:block">
          <ul className="flex items-center gap-x-5">
            <li className="user-menu">
              <NavbarServiceMenu />
            </li>
            <li className="user-menu">
              <NavbarBuyMenu />
            </li>
            <li className="user-menu">
              <NavbarRentalMenu />
            </li>
            <li
              className={`nav-item font-bold cursor-pointer ${
                router.asPath.includes('tradingForm=4') ? 'text-primary' : 'text-info'
              }`}
              onClick={() => {
                router.push('/filter?tradingForm=4')
              }}
            >
              Tìm bạn ở ghép
            </li>
            <li className="user-menu nav-item font-bold cursor-pointer text-info">
              <NavbarSeeMoreMenu />
            </li>

            {profile.id && (
              <Fragment>
                <li className="font-bold cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full bg-backgroundGray">
                  <Notification />
                </li>
                <li className="nav-item font-bold cursor-pointer user-menu">
                  <NavbarChat />
                </li>
              </Fragment>
            )}
            <li className="nav-item font-bold cursor-pointer user-menu">
              <NavbarUserMenu />
            </li>
            {!(profile.role === roleConfig.ADMIN) && (
              <Fragment>
                {!profile?.id ? (
                  <li
                    className="nav-item font-bold cursor-pointer flex items-center space-x-2 bg-primary px-3 py-1 rounded-full"
                    onClick={handlePostNew}
                  >
                    <i className="fa-regular fa-pencil text-lg text-white"></i>
                    <span className="text-white">Đăng tin</span>
                  </li>
                ) : (
                  <div className="user-menu">
                    <NavbarPostNew />
                  </div>
                )}
              </Fragment>
            )}
          </ul>
        </div>
      </div>
      <Drawer ref={nodeRef} show={showDrawer} setShow={setShowDrawer} />
      <DrawerRight ref={drawerRightRef} show={showDrawerRight} setShow={setShowDrawerRight} />
      <ModalRequireLogin id={'modal-require-login'} handleClick={handleLogin} />
    </div>
  )
}
