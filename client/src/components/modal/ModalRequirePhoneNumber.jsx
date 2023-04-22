import React, { useEffect, useState } from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import FormGroup from "../common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import { userAPI } from "apis/user";
import { toast } from "react-toastify";
import { authUpdateProfile } from "store/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import InputWithoutValidate from "../input/InputWithoutValidate";
import { checkEmail, checkPhone } from "utils/common";
import { Label } from "../label";

const ModalRequirePhoneNumber = ({ handleClick = () => {}, id, userId }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  useEffect(() => {
    if (profile) {
      setPhoneNumber(profile.phoneNumber);
      setEmail(profile.email);
    }
  }, [profile]);
  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    try {
      let data = {};
      if (!profile.phoneNumber) {
        data.phoneNumber = phoneNumber;
      }
      if (!profile.email) {
        data.email = email;
      }
      console.log("data", data);
      const res = await userAPI.updateAccount({
        id: userId,
        data: { ...data },
      });
      if (res.ok) {
        const profileRes = await userAPI.getProfile();
        dispatch(authUpdateProfile(profileRes));
        const modal = document.getElementById("modal-require-phoneNumber-id");
        if (modal) {
          modal.click();
        }
        toast.success("Cập nhật thông tin thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Cập nhật thông tin thất bại!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Cập nhật thông tin thất bại!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const checkPhoneNumber = (phone) => {
    setPhoneNumber(phone);
    if (checkPhone(phone)) {
      setErrorPhone("");
    } else {
      setErrorPhone("Số điện thoại không hợp lệ");
    }
  };

  const handleCheckemail = (email) => {
    setEmail(email);
    if (checkEmail(email)) {
      setErrorEmail("");
    } else {
      setErrorEmail("Email không hợp lệ");
    }
  };
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-require-phoneNumber-id"}
      >
        <label className="modal-box relative" htmlFor="">
          <form onSubmit={handleUpdatePhoneNumber}>
            <div>
              <h3 className="text-lg font-bold my-0 text-center">
                Cập nhật thông tin.
              </h3>
              <div className="text-center py-2">
                Vui lòng cập nhật đầy đủ thông tin liên hệ của bạn.
              </div>
              {!profile.phoneNumber ? (
                <div>
                  <FormGroup mb={false}>
                    <Label className="font-bold" isRequired>
                      Số điện thoại
                    </Label>
                    <InputWithoutValidate
                      value={phoneNumber}
                      placeholder={"VD: 0925678252"}
                      type={"number"}
                      onChange={(e) => checkPhoneNumber(e.target.value)}
                    />
                  </FormGroup>
                  {errorPhone && (
                    <span className="text-red-500 text-sm">{errorPhone}</span>
                  )}
                </div>
              ) : null}
              {!profile.email ? (
                <div>
                  <FormGroup mb={false}>
                    <Label className="font-bold" isRequired>
                      Email
                    </Label>
                    {/* <input
                    type="number"
                    {...field}
                    name={"phoneNumber"}
                    value={watcherPhoneNumber}
                    placeholder={"Nhập số điện thoại của bạn"}
                    className={
                      "p-3 border border-primary rounded-lg focus:border-2"
                    }
                  /> */}

                    <InputWithoutValidate
                      value={email}
                      placeholder={"VD: abc@gmail.com"}
                      type={"text"}
                      onChange={(e) => handleCheckemail(e.target.value)}
                    />
                  </FormGroup>
                  {errorEmail && (
                    <span className="text-red-500 text-sm">{errorEmail}</span>
                  )}
                </div>
              ) : null}
            </div>

            <div className="my-4">
              <ButtonPrimary
                title="Cập nhật"
                className="w-full"
                type="submit"
              />
            </div>
          </form>
        </label>
      </label>
    </div>
  );
};

export default ModalRequirePhoneNumber;
