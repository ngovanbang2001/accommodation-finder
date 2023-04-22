import React, { useEffect, useState } from "react";
import LayoutWithSideBar from "@/components/layout/LayoutWithSideBar";
import CharacteristicsItem from "@/components/characteristics/CharacteristicsItem";
import FormGroup from "@/components/common/FormGroup";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AvatarWithUpload from "@/components/user/AvatarWithUpload";
import { useSelector } from "react-redux";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import { userAPI } from "apis/user";
import { toast } from "react-toastify";

const schema = yup.object({
  displayName: yup.string().required("Vui lòng nhập họ tên"),
});
export default function MyProfile() {
  const profile = useSelector((state) => state.auth.profile);
  const [address, setAddress] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (profile.displayName) {
      const initialValue = {};
      setAddress(profile.address);
      initialValue.displayName = profile.displayName;
      reset({ ...initialValue });
    }
  }, [profile]);

  const handleUpdate = async (values) => {
    try {
      const data = { ...values };
      if (address) {
        data.address = address;
      }
      const res = await userAPI.updateAccount({
        id: profile.id,
        data: { ...data },
      });
      if (res.ok) {
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
        toast.error("Đã có lỗi xảy ra!", {
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
      toast.error("Đã có lỗi xảy ra!", {
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
    <div
      className={
        "my-4 lg:px-4 px-2 py-8 mx-auto flex items-center flex-col max-w-[700px]"
      }
    >
      {profile.id && (
        <div className={"w-full"}>
          <div className={"info-title"}>Thông tin tài khoản</div>
          <div>
            <div className={"flex justify-center mb-4"}>
              <AvatarWithUpload
                width={150}
                height={150}
                avatar={profile.avatar}
                userId={profile.id}
              />
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className={"flex-col flex space-y-2"}>
                <FormGroup isMb={false}>
                  <Label>Họ tên</Label>

                  <Input
                    control={control}
                    name={"displayName"}
                    error={errors.displayName?.message}
                    placeholder={"VD: Quang Thuận"}
                  />
                </FormGroup>
              </div>
              <div>
                <ButtonPrimary
                  className="w-[200px] float-right"
                  title="Cập nhật"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
MyProfile.Layout = LayoutWithSideBar;
