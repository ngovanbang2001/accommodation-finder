import React from 'react'
import PropTypes from 'prop-types'
import DrawerHeader from '../drawer-menu/drawer-menu-left/DrawerHeader'
import DrawerItem from '../drawer-menu/drawer-menu-left/DrawerItem'

const menu = [
  {
    id: 1,
    title: 'Cho thuê',
    children: [
      { id: 1, title: 'Căn hộ/Chung cư' },
      { id: 2, title: 'Nhà ở' },
      { id: 3, title: 'Văn phòng/Mặt bằng' },
      { id: 4, title: 'Phòng trọ' },
    ],
  },
  {
    id: 2,
    title: 'Cần thuê',
    children: [
      { id: 1, title: 'Căn hộ/Chung cư' },
      { id: 2, title: 'Nhà ở' },
      { id: 3, title: 'Văn phòng/Mặt bằng' },
      { id: 4, title: 'Phòng trọ' },
    ],
  },
  {
    id: 3,
    title: 'Mua bán',
    children: [
      { id: 1, title: 'Căn hộ/Chung cư' },
      { id: 2, title: 'Nhà ở' },
      { id: 3, title: 'Văn phòng/Mặt bằng' },
    ],
  },
  {
    id: 4,
    title: 'Tìm bạn ở ghép',
  },
  {
    id: 6,
    title: 'Xem thêm',
    children: [
      { id: 1, title: 'Về TROTOT', path: '/about' },
      { id: 2, title: 'Bảng giá dịch vụ', path: '/pricing' },
    ],
  },
]
const Drawer = React.forwardRef(({ show, setShow }, nodeRef) => {
  return (
    <div
      ref={nodeRef}
      className={`w-full h-screen bg-overlay transition-all fixed top-0 bottom-0 ${
        show ? '' : '-translate-x-full'
      }`}
    >
      <div className="w-[80%] md:w-[60%] bg-base-100 h-screen">
        <DrawerHeader />
        <div className="px-2">
          {menu.map((item) => (
            <DrawerItem key={item.id} item={item} setShow={setShow} />
          ))}
        </div>
      </div>
    </div>
  )
})

Drawer.displayName = 'Drawer'
Drawer.propTypes = {
  show: PropTypes.bool,
  nodeRef: PropTypes.element,
}
export default Drawer
