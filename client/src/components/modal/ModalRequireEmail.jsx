import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import FormGroup from "../common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import { userAPI } from "apis/user";
import { toast } from "react-toastify";
import { authUpdateProfile } from "store/auth/auth-slice";
import { useDispatch } from "react-redux";

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const schema = yup.object({
  email: yup
    .string()
    .matches(emailRegExp, "Email không hợp lệ")
    .required("Vui lòng nhập email"),
});
const ModalRequireEmail = ({ handleClick = () => {}, id, userId }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { field } = useController({
    control,
    name: "email",
  });
  const watcherEmail = watch("email");
  const dispatch = useDispatch();
  const handleUpdateEmail = async (values) => {
    try {
      const res = await userAPI.updateAccount({
        id: userId,
        data: { ...values },
      });
      if (res.ok) {
        const modal = document.getElementById("modal-require-email-id");
        const profileRes = await userAPI.getProfile();
        dispatch(authUpdateProfile(profileRes));
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
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-require-email-id"}
      >
        <label className="modal-box relative" htmlFor="">
          <form onSubmit={handleSubmit(handleUpdateEmail)}>
            <div>
              <h3 className="text-lg font-bold my-0 text-center">
                Cập nhật thông tin.
              </h3>
              <div className="text-center py-2">
                Vui lòng cập nhật Email của bạn.
              </div>
              <div>
                <FormGroup mb={false}>
                  <label className="font-bold">Email</label>
                  <input
                    {...field}
                    name={"email"}
                    value={watcherEmail}
                    placeholder={"Nhập email của bạn"}
                    className={
                      "p-3 border border-primary rounded-lg focus:border-2"
                    }
                  />
                </FormGroup>
                {errors.email?.message && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
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

export default ModalRequireEmail;
