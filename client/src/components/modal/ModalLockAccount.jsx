import React, { useRef } from "react";
import PropTypes from "prop-types";
import logo from "@/assets/images/authorization.svg";
import Image from "next/image";
import ButtonSeeMore from "../button/ButtonSeeMore";
import { removeToken } from "utils/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authUpdateProfile } from "store/auth/auth-slice";
import ButtonPrimary from "../button/ButtonPrimary";
const ModalLockAccount = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = () => {
    removeToken();
    dispatch(authUpdateProfile({}));
    router.replace("/sign-in");
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("modal-lock-account");
    if (modal) {
      modal.click();
    }
  };
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label className="modal" id="modal-lock-account">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold my-2 text-center">
            Thông báo từ <span className="text-primary">TROTOT</span>
          </h3>
          <div className="flex flex-col items-center justify-center py-2">
            <Image
              src={logo}
              width={80}
              height={40}
              className={"object-contain"}
              alt={"logo"}
            />
            <div className="pt-4 flex justify-center flex-col items-center space-y-3">
              <div className="font-semibold text-red-500">
                Tài khoản của bạn đã bị tạm khóa.
              </div>
              <div className="text-sm">
                Vui lòng liên hệ{" "}
                <span className="font-bold">Quản trị viên</span> để biết thêm
                chi tiết.
              </div>

              <label
                className="pt-2 pb-2"
                htmlFor={id}
                onClick={() => handleClick()}
              >
                <ButtonPrimary
                  title="Đã hiểu"
                  className="w-[200px]"
                  handleClick={handleCloseModal}
                />
              </label>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

ModalLockAccount.propTypes = {
  id: PropTypes.string,
};
export default ModalLockAccount;
