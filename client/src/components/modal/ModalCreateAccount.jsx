import React, { useState } from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import TextArea from "../input/TextArea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userAPI } from "apis/user";
import FormGroup from "../common/FormGroup";
import { Input } from "../input";
import { Label } from "../label";
import { toast } from "react-toastify";

const ModalCreateAccount = ({ id }) => {
  const schema = yup.object({
    username: yup.string().required("Vui lòng nhập username"),
    displayName: yup.string().required("Vui lòng nhập username"),
    password: yup.string().required("Vui lòng nhập username"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateAccount = async (values) => {
    try {
      const res = await userAPI.createAccount({
        ...values,
      });
      if (res.account) {
        const modal = document.getElementById("modal-create-account");
        if (modal) {
          modal.click();
        }
        toast.success("Tạo tài khoản thành công!", {
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
        toast.success("Tạo tài khoản thất bại!", {
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
      toast.success("Tạo tài khoản thất bại!", {
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
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-create-account"}
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Tạo tài khoản
            <span className="text-primary"> Cộng tác viên</span>
          </h3>
          <div className="py-4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ">
            <form onSubmit={handleSubmit(handleCreateAccount)}>
              <FormGroup>
                <Label htmlFor={"username"}>Username</Label>
                <Input
                  control={control}
                  error={errors.username?.message}
                  placeholder={"abc"}
                  name={"username"}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor={"displayName"}>Tên hiển thị</Label>
                <Input
                  control={control}
                  error={errors.displayName?.message}
                  placeholder={"Cộng tác viên 1"}
                  name={"displayName"}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor={"password"}>Mật khẩu</Label>
                <Input
                  control={control}
                  error={errors.password?.message}
                  placeholder={"****"}
                  type={"password"}
                  name={"password"}
                ></Input>
              </FormGroup>
              <div>
                <ButtonPrimary
                  title="Tạo tài khoản"
                  className="float-right px-2 w-[200px]"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalCreateAccount;
