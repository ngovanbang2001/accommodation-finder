import React, { Fragment } from 'react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { useRouter } from 'next/router'
import { MenuItem as MyMenuItem } from './MenuItem'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { removeToken } from 'utils/auth'
import { authUpdateProfile } from 'store/auth/auth-slice'
import { menuAdmin, menuGuest, menuUser, roleConfig } from 'configs/configs'
import { authAPI } from 'apis/auth'
import { async } from '@firebase/util'
import Cookies from 'js-cookie'
export default function NavbarUserMenu(props) {
  const profile = useSelector((state) => state.auth.profile)

  const router = useRouter()
  const dispatch = useDispatch()
  const handleMenuClick = async (item) => {
    if (item.id === 112) {
      if (theme === 'light') {
        localStorage.setItem('theme', 'dark')
      } else if (theme === 'dark') {
        localStorage.setItem('theme', 'light')
      } else {
        localStorage.setItem('theme', 'dark')
      }
      window.dispatchEvent(new Event('storage'))
      return
    } else if (item.id === 6) {
      const sessionId = Cookies.get(process.env.NEXT_PUBLIC_SESSION_ID)
      const res = await authAPI.logout(sessionId)
      if (res.ok) {
        dispatch(authUpdateProfile({}))
        removeToken()
        router.replace(`/`)
      }
    } else if (item.path) {
      router.push(item.path)
    }
  }

  const getMenu = () => {
    if (profile.role === roleConfig.USER) {
      return menuUser
    } else if (profile.role === roleConfig.ADMIN) {
      return menuAdmin
    } else {
      return menuGuest
    }
  }
  return (
    <div className="flex items-center justify-center">
      <Menu
        menuButton={
          <MenuButton>
            {profile.avatar ? (
              <div className="h-[39px] w-[39px] relative">
                <Image
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  src={profile.avatar}
                  className="rounded-full"
                />
              </div>
            ) : (
              <i className="fa-sharp fa-regular fa-circle-user text-4xl text-primary"></i>
            )}
          </MenuButton>
        }
        transition
      >
        <Fragment>
          {getMenu().map((item) => (
            <MenuItem onClick={() => handleMenuClick(item)} key={item.id}>
              <MyMenuItem title={item.title} icon={item.icon} />
            </MenuItem>
          ))}
        </Fragment>
      </Menu>
    </div>
  )
}
