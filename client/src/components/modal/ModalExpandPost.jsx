import React, { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import FormGroup from "../common/FormGroup";
import MySelect from "@/components/select/Select";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostTypeAPI } from "apis/post-type";
import { formatPrice } from "utils/common";
import { Label } from "../label";
import { async } from "@firebase/util";
import { PostAPI } from "apis/post";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userAPI } from "apis/user";
import { authUpdateProfile } from "store/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import ButtonSecondary from "../button/ButtonSecondary";

const schema = yup.object({
  time: yup.object().shape({
    value: yup.string().required("Vui lòng chọn thời gian"),
    label: yup.string().required("Vui lòng chọn thời gian"),
  }),
  timeNumber: yup.object().shape({
    value: yup.string().required("Vui lòng chọn khoảng thời gian"),
    label: yup.string().required("Vui lòng chọn khoảng thời gian"),
  }),
});
const ModalExpandPost = ({ id, typeId, title, postId }) => {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watcherTime = watch("time");
  const watcherTimeNumber = watch("timeNumber");
  const [postType, setPostType] = useState({});
  const [timeCount, setTimeCount] = useState([]);
  const [pricePostType, setPricePostType] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeNumber, setSelectedTimeNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter();
  const dispatch = useDispatch();
  const timePackage = [
    {
      label: "Đăng theo ngày",
      value: 1,
    },
    {
      label: "Đăng theo tuần",
      value: 2,
    },
    {
      label: "Đăng theo tháng",
      value: 3,
    },
  ];
  const weekPackage = [
    {
      label: "1 tuần",
      value: 1,
    },
    {
      label: "2 tuần",
      value: 2,
    },
    {
      label: "3 tuần",
      value: 3,
    },
  ];

  const dayPackage = [
    {
      label: "3 ngày",
      value: 3,
    },
    {
      label: "4 ngày",
      value: 4,
    },
    {
      label: "5 ngày",
      value: 5,
    },
    {
      label: "6 ngày",
      value: 6,
    },
    {
      label: "7 ngày",
      value: 7,
    },
  ];

  const monthPackage = [
    {
      label: "1 tháng",
      value: 1,
    },
    {
      label: "2 tháng",
      value: 2,
    },
    {
      label: "3 tháng",
      value: 3,
    },
  ];
  useEffect(() => {
    (async () => {
      if (typeId) {
        try {
          const res = await PostTypeAPI.getPostType({ id: typeId });
          if (res) {
            setPostType(res.postType);
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [typeId]);
  useEffect(() => {
    if (watcherTime) {
      setSelectedTime(watcherTime);
      setSelectedTimeNumber(null);
      switch (watcherTime.value) {
        case 1: {
          setPricePostType(postType.priceForDay);
          setTimeCount(dayPackage);
          break;
        }
        case 2: {
          setPricePostType(postType.priceForWeek);
          setTimeCount(weekPackage);
          break;
        }
        case 3: {
          setPricePostType(postType.priceForMonth);
          setTimeCount(monthPackage);
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [watcherTime]);

  useEffect(() => {
    if (watcherTime) {
      setSelectedTimeNumber(watcherTimeNumber);
      setAmount(pricePostType * watcherTimeNumber.value);
    }
  }, [watcherTimeNumber]);

  const handleCancel = () => {
    const modal = document.getElementById("modal-expand-post-id");
    if (modal) {
      modal.click();
    }
  };
  const handleExpandPost = async (values) => {
    try {
      const res = await PostAPI.approvePost(postId, {
        isActive: 1,
        timeNumber: values.timeNumber.value,
        kindOfTime: values.time.value,
        status: 1,
        amount,
      });
      if (res.ok) {
        handleCancel();
        const profileRes = await userAPI.getProfile();
        dispatch(authUpdateProfile(profileRes));
        router.push(`/management/post`);

        toast.success("Gia hạn tin thành công!", {
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
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-expand-post-id"}
      >
        <label className="modal-box relative max-w-2xl w-10/12" htmlFor="">
          <form onSubmit={handleSubmit(handleExpandPost)}>
            <div>
              <h3 className="text-lg font-bold my-0 text-center">
                Gia hạn tin đăng
              </h3>
              <div className="font-bold text-center">{title}</div>
              <div className="text-center py-2">
                Vui lòng chọn thông tin gia hạn.
              </div>
              <div className="pb-2">
                Loại tin: <span className="font-bold">{postType?.title}</span>
              </div>
              <div>
                <div className="flex-1">
                  <FormGroup>
                    <Label className="font-bold">Chọn thời gian</Label>
                    <MySelect
                      options={timePackage}
                      control={control}
                      error={errors.time?.label?.message}
                      placeholder={"VD: Đăng theo ngày"}
                      value={selectedTime}
                      name={"time"}
                    ></MySelect>
                  </FormGroup>
                </div>
                <div className="flex-1">
                  <FormGroup>
                    <Label className="font-bold">Chọn số ngày</Label>
                    <MySelect
                      options={timeCount}
                      control={control}
                      error={errors.timeNumber?.label?.message}
                      placeholder={"VD: 2 tuần"}
                      value={selectedTimeNumber}
                      name={"timeNumber"}
                    ></MySelect>
                  </FormGroup>
                </div>
              </div>
            </div>
            {selectedTime?.value && selectedTimeNumber?.value && (
              <Fragment>
                <div className="divider font-bold">Thông tin thanh toán</div>
                <div className="w-full flex flex-col space-y-2 pb-4">
                  <div className="flex items-center justify-between space-x-2">
                    <span>Tin đăng:</span>
                    <span className="font-bold line-clamp-1">{title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loại tin:</span>
                    <span className="font-bold">{postType.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hình thức đăng:</span>
                    <span className="font-bold">{watcherTime.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thời hạn:</span>
                    <span className="font-bold">{watcherTimeNumber.label}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Tổng thanh toán:</span>
                    <span className="font-bold text-primary">
                      {formatPrice(+amount)}
                      <span>&#8363;</span>
                    </span>
                  </div>
                </div>
              </Fragment>
            )}
            {profile.balance < amount ? (
              <div className="flex flex-col space-y-5">
                <div className="bg-red-100 p-3.5 rounded-lg text-center text-red-500">
                  <i className="fa-light fa-circle-exclamation"></i>
                  <span>
                    {" "}
                    Tài khoản của bạn không đủ số dư để gia hạn tin đăng. Vui
                    lòng nạp thêm tiền vào tài khoản và thử lại sau.
                  </span>
                </div>
                <ButtonSecondary
                  title={"Nạp tiền vào tài khoản"}
                  isPrimary={false}
                  styles={"p-2 text-center"}
                  className={"w-full"}
                  handleClick={() => router.push(`/deposit`)}
                />
              </div>
            ) : (
              <div className="my-4 flex items-center justify-end space-x-3">
                <span className="cursor-pointer" onClick={handleCancel}>
                  Hủy bỏ
                </span>
                <ButtonPrimary
                  title="Gia hạn "
                  className="w-[150px] md:w-[200px]"
                  type="submit"
                />
              </div>
            )}
          </form>
        </label>
      </label>
    </div>
  );
};

export default ModalExpandPost;
