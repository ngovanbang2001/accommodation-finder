import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { authUpdateProfile } from "store/auth/auth-slice";
import { authAPI } from "apis/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const RightMenuItemDrawer = ({ item, showDrawerRight }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = async () => {
    if (item.id === 115) {
      const sessionId = Cookies.get(process.env.NEXT_PUBLIC_SESSION_ID);
      try {
        const res = await authAPI.logout(sessionId);
        if (res.ok) {
          dispatch(authUpdateProfile({}));
          removeToken();
          router.replace(`/`);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (item.path) {
      router.push(item.path);
      showDrawerRight(false);
    }
  };
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`w-[25px] h-[25px] md:w-[30px] md:h-[30px] bg-backgroundGray rounded-full flex items-center justify-center my-2.5`}
      >
        <i className={`${item.icon} text-colorIconMenu text-sm md:text-lg`}></i>
      </div>
      <span className="font-semibold text-info">{item.title}</span>
    </div>
  );
};

RightMenuItemDrawer.propTypes = {
  item: PropTypes.object,
  showDrawerRight: PropTypes.func,
};
export default RightMenuItemDrawer;
