import React, { useState } from "react";
import FormGroup from "../common/FormGroup";
import { Label } from "../label";
import dynamic from "next/dynamic";
import ButtonPrimary from "../button/ButtonPrimary";
const MyEditor = dynamic(() => import("../../components/my-editor/Editor"), {
  ssr: false,
});
const ModalRejectPost = ({ id, rejectPost }) => {
  const [reason, setReason] = useState("");

  const handleRejectPost = async () => {
    rejectPost(reason);
  };
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer "
        id={"modal-reject-post"}
      >
        <label className="modal-box relative w-10/12 max-w-4xl" htmlFor="">
          <h3 className="text-lg font-bold">Từ chối tin đăng</h3>
          <div className="py-4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ">
            <FormGroup>
              <Label>Lý do</Label>
              <div>
                <MyEditor
                  value={reason}
                  onBlurP={({ res }) => setReason(res)}
                />
              </div>
            </FormGroup>
            <div className="flex items-center space-x-5 justify-end">
              <span>Hủy bỏ</span>
              <ButtonPrimary
                title="Từ chối"
                className="w-[200px]"
                handleClick={handleRejectPost}
              />
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalRejectPost;
