import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";

const ModalComfirmDeleteComment = ({ handleClick, id }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer" id={'modal-delete-cmt'}>
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Xóa bình luận?</h3>
          <span>Bạn có chắc chắn muốn xóa bình luận này?</span>

          <div className="flex items-center justify-end space-x-3 py-3">
            <label htmlFor={id} className="cursor-pointer">
              <span>Hủy bỏ</span>
            </label>
            <ButtonPrimary
              title="Xóa"
              className="w-[100px]"
              handleClick={handleClick}
            />
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalComfirmDeleteComment;
