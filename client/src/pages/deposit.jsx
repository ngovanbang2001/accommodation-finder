import ButtonPrimary from "@/components/button/ButtonPrimary";
import FormGroup from "@/components/common/FormGroup";
import React, { useEffect, useState } from "react";
import { formatPrice } from "utils/common";
import { paymentAPI } from "apis/payment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import logo_vnpay from "@/assets/images/logo-vnpay.png";
import icon_vnpay from "@/assets/images/Icon-VNPAY-QR.webp";
import { userAPI } from "apis/user";
import { authUpdateProfile } from "store/auth/auth-slice";
const amountTemplate = [
  {
    id: 1,
    value: 50000,
  },
  {
    id: 2,
    value: 100000,
  },
  {
    id: 3,
    value: 200000,
  },
  {
    id: 4,
    value: 500000,
  },
];
const Payment = () => {
  const [dataPayment, setDataPayment] = useState(null);
  const [amount, setAmount] = useState();
  const [errorAmount, setErrorAmount] = useState(null);
  const profile = useSelector((state) => state.auth.profile);
  const [showInfoPayment, setShowInfoPayment] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setShowInfoPayment(!showInfoPayment);
  }, [dataPayment]);

  const router = useRouter();

  const handleChangeInput = (e) => {
    setAmount(e.target.value);
    if (!e.target.value || e.target.value < 10000) {
      setErrorAmount("Số tiền không hợp lệ");
    } else {
      setErrorAmount("");
    }
  };

  const handleDeposit = async () => {
    try {
      if (!errorAmount && amount >= 10000) {
        const res = await paymentAPI.desposit({
          amount,
          id: profile.id,
        });
        if (res) {
          const profileRes = await userAPI.getProfile();
          dispatch(authUpdateProfile({ ...profileRes }));
          router.push(res.url);
        }
      } else {
        setErrorAmount("Số tiền không hợp lệ");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetAmount = (item) => {
    setAmount(item.value);
    setErrorAmount("");
  };
  return (
    <div className="bg-base-200">
      <div className="mx-auto py-16 max-w-[700px]">
        <div className="flex flex-col md:space-y-4 space-y-2 items-center justify-center">
          <div className="flex items-center space-x-2 font-bold md:text-xl">
            <i className="fa-light fa-sack-dollar"></i>
            <span>Số dư tài khoản của bạn</span>
          </div>
          <span className="font-bold text-2xl md:text-4xl text-primary">
            {formatPrice(profile?.balance)}
            <span> &#8363;</span>
          </span>
          <p className="text-center">
            Hãy đảm bảo số dư tài khoản luôn đủ để sử dụng các dịch vụ của chúng
            tôi.
          </p>
        </div>
        <div className="p-4 bg-base-100 rounded-lg my-8">
          {(!dataPayment || !showInfoPayment) && (
            <div>
              <div className="flex-1">
                <FormGroup isMb={false}>
                  <div className="flex flex-col pb-2">
                    <label className="font-semibold">Số tiền</label>
                    <span className="text-sm italic">
                      * Số tiền tối thiểu là 10.000đ
                    </span>
                  </div>
                  <input
                    type={"number"}
                    value={amount}
                    placeholder={"VD: 20000"}
                    onChange={(e) => handleChangeInput(e)}
                    className={`p-3 rounded-lg border ${
                      errorAmount ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  <span className="text-sm text-red-500">{errorAmount}</span>
                  <div className="flex items-center space-x-3">
                    {!amount &&
                      amountTemplate.map((item) => (
                        <div
                          className="bg-blue-50 px-2 py-1 w-fit rounded-lg border border-primary text-sm text-primary cursor-pointer"
                          key={item.id}
                          onClick={() => handleSetAmount(item)}
                        >
                          {formatPrice(item.value)}
                          <span> &#8363;</span>
                        </div>
                      ))}
                  </div>
                </FormGroup>
              </div>
            </div>
          )}
          <div className="font-semibold py-2">Thanh toán qua tài khoản</div>
          <div
            className={`box-shadow rounded-lg p-2 ${
              errorAmount ? "cursor-auto" : "cursor-pointer"
            }`}
            onClick={handleDeposit}
          >
            <div className="flex items-center p-2 justify-center rounded-lg border-2 border-primary">
              <Image
                alt={"icon-vn-pay"}
                src={icon_vnpay}
                width={50}
                height={25}
                className={"object-contain"}
              />
              <Image
                alt={"logo-vn-pay"}
                src={logo_vnpay}
                width={100}
                height={30}
                className={"object-contain"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
