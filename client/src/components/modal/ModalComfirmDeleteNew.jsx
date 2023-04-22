import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";

const ModalComfirmDeleteNew = ({
  handleClick,
  id,
  title,
  description,
  id2,
}) => {
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer" id={id2}>
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">{title}</h3>
          <span>{description}</span>

          <div className="flex items-center justify-end space-x-3 py-3">
            <label htmlFor={id} className="cursor-pointer">
              <span>Hủy bỏ</span>
            </label>
            <label htmlFor={id}>
              <ButtonPrimary
                title="Xóa"
                className="w-[100px]"
                handleClick={handleClick}
              />
            </label>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalComfirmDeleteNew;
