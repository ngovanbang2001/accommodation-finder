import * as React from 'react'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { MenuItem as MyMenuItem } from './MenuItem'
import { useRouter } from 'next/router'
export default function NavbarSeeMoreMenu() {
  const menu = [
    { id: 1, title: 'Về TROTOT', path: '/about' },
    { id: 2, title: 'Bảng giá dịch vụ', path: '/pricing' },
  ]
  const router = useRouter()
  return (
    <Menu
      menuButton={
        <MenuButton>
          <span
            className={`nav-item font-bold cursor-pointer ${
              router.pathname === '/about' || router.pathname === 'pricing'
                ? 'text-primary'
                : 'text-info'
            }`}
          >
            Xem thêm
          </span>
        </MenuButton>
      }
      transition
    >
      {menu.map((item) => (
        <MenuItem key={item.id}>
          <MyMenuItem title={item.title} path={item.path} />
        </MenuItem>
      ))}
    </Menu>
  )
}
