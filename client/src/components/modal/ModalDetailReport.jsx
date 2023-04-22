import Image from "next/image";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import logo from "@/assets/images/logo_no_icon.png";
import InputWithoutValidate from "../input/InputWithoutValidate";
import CheckBox from "../input/CheckBox";
import RadioWithoutValidate from "../input/RadioWithoutValidate";
import {
  categoryConfig,
  districtsConfig,
  provincesConfig,
  tradingFormConfig,
  wardsConfig,
} from "configs/configs";
import TextArea from "../input/TextArea";
import { Label } from "../label";
import { reportAPI } from "apis/report";
import { toast } from "react-toastify";
const ModalDetailReport = ({ handleClick = () => {}, id, postId }) => {
  useEffect(() => {
    (async () => {
      try {
        const res = await reportAPI.getReasonPostReport(postId, {
          offset: 0,
          limit: 5,
        });
        console.log("res", res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-detail-report-post-id"}
      >
        <label className="modal-box relative" htmlFor="">
          <div className="">
            <h3 className="text-lg font-bold my-0">Chi tiết báo cáo</h3>

            <div className="flex flex-col space-y-4 my-2"></div>
          </div>
          <div className="my-4 flex items-center space-x-3 justify-end">
            <label htmlFor={id}>Hủy bỏ</label>
            <ButtonPrimary title="Báo cáo" className="w-[150px]" />
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalDetailReport;
