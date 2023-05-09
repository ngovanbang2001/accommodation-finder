import React, { useEffect } from 'react'
import Avatar from '@/components/user/Avatar'
import SideBarItem from '@/components/side-bar/SideBarItem'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { authAPI } from 'apis/auth'
import { removeToken } from 'utils/auth'
import { authUpdateProfile } from 'store/auth/auth-slice'

const sideBars = [
  { id: 1, icon: 'fa-regular fa-ballot', title: 'Quản lý tin đăng' },
  { id: 2, icon: 'fa-regular fa-circle-dollar', title: 'Cấu hình giá' },
  { id: 3, icon: 'fa-regular fa-users', title: 'Quản lý tài khoản' },
  { id: 4, icon: 'fa-regular fa-user', title: 'Quản lý thông tin cá nhân' },
  { id: 5, icon: 'fa-regular fa-arrow-right-from-bracket', title: 'Đăng xuất' },
]
export default function SideBar(props) {
  const dispatch = useDispatch()
  const [sideBarActive, setSideBarActive] = useState(1)
  const profile = useSelector((state) => state.auth.profile)
  const router = useRouter()
  const handleChangeSideBarItem = async (index) => {
    setSideBarActive(index)

    switch (index) {
      case 1: {
        router.replace(`/managements/post`)
        break
      }
      case 2: {
        router.push(`/managements/price`)
        break
      }
      case 3: {
        router.push(`/managements/account`)
        break
      }
      case 4: {
        router.push(`/managements/profile`)
        break
      }
      case 5: {
        try {
          const sessionId = Cookies.get(process.env.NEXT_PUBLIC_SESSION_ID)
          const res = await authAPI.logout(sessionId)
          if (res.ok) {
            dispatch(authUpdateProfile({}))
            removeToken()
            router.replace(`/sign-in/account`)
          }
          break
        } catch (e) {
          console.log(e)
        }
      }
      default: {
        break
      }
    }
  }

  useEffect(() => {
    if (router.pathname) {
      if (router.pathname.includes('post')) {
        setSideBarActive(1)
      } else if (router.pathname.includes('account')) {
        setSideBarActive(3)
      } else if (router.pathname.includes('price')) {
        setSideBarActive(2)
      } else if (router.pathname.includes('profile')) {
        setSideBarActive(4)
      }
    }
  }, [router])

  return (
    <div className="hidden xl:block xl:w-[330px] h-[100vh] box-shadow sticky left-0 top-[76px] bottom-0">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar sizeAvatar="w-16" avatar={profile.avatar} />
          <div>
            <div className="font-bold">{profile.displayName}</div>
            <div
              className={`text-white text-xs px-2 py-1 ${
                profile.role === 1 ? 'bg-primary' : 'bg-orange-400'
              } w-fit rounded-lg`}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {sideBars?.map((item) => (
          <div onClick={() => handleChangeSideBarItem(item.id)} key={item.id}>
            <SideBarItem item={item} active={item.id === sideBarActive} />
          </div>
        ))}
      </div>
    </div>
  )
}
