import React from 'react'
import PropTypes from 'prop-types'
import DrawerHeader from '../drawer-menu/drawer-menu-left/DrawerHeader'
import RightMenuItemDrawer from '../drawer-menu/drawer-menu-right/RightMenuItemDrawer'
import { menuAdmin, menuGuest, menuUser, roleConfig } from 'configs/configs'
import { useSelector } from 'react-redux'

const DrawerRight = React.forwardRef(({ show, setShow }, nodeRef) => {
  const profile = useSelector((state) => state.auth.profile)

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
    <div
      ref={nodeRef}
      className={`w-full h-screen bg-overlay transition-all fixed top-0 bottom-0 right-0 ${
        show ? '' : 'translate-x-full'
      }`}
    >
      <div className="w-[80%] md:w-[60%] bg-base-100 h-screen absolute top-0 bottom-0 right-0 ">
        <DrawerHeader />
        <div className="px-2">
          {getMenu()?.map((item) => (
            <RightMenuItemDrawer item={item} key={item.id} showDrawerRight={setShow} />
          ))}
        </div>
      </div>
    </div>
  )
})

DrawerRight.displayName = 'DrawerRight'
DrawerRight.propTypes = {
  show: PropTypes.bool,
  nodeRef: PropTypes.element,
}
export default DrawerRight
