import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ButtonPrimary from "../button/ButtonPrimary";
import { toast } from "react-toastify";
import FormGroup from "../common/FormGroup";
import { Label } from "../label";
import InputWithoutValidate from "../input/InputWithoutValidate";
import { NewCategoryAPI } from "apis/new-category";

const ModalCreateNewCategory = ({ id, handleAddCategory }) => {
  const modalCreateNewCategory = useRef(null);
  const [category, setCategory] = useState("");
  const handleCreateCatgory = async () => {
    try {
      const res = await NewCategoryAPI.createCategory({ category });
      if (res) {
        modalCreateNewCategory.current.click();
        const data = {
          ...res,
          status: res.status ? 1 : 0,
        };
        handleAddCategory(data);
        setCategory("");
        toast.success("Tạo danh mục thành công!", {
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
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal"
        ref={modalCreateNewCategory}
        id={"modal-create-new-category-id"}
      >
        <div className="modal-box relative">
          <h3 className="text-lg font-bold my-2">Danh mục tin tức</h3>
          <div className={""}>
            <div>
              <FormGroup>
                <Label>Tên danh mục</Label>
                <InputWithoutValidate
                  value={category}
                  placeholder={"Mẹo hay Bất động sản"}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className={"pt-4 flex items-center space-x-5 justify-end"}>
              <span>Hủy bỏ</span>
              <ButtonPrimary
                className="w-[200px] mx-auto"
                title={"Tạo mới"}
                handleClick={handleCreateCatgory}
              />
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

ModalCreateNewCategory.propTypes = {
  id: PropTypes.string,
};
export default ModalCreateNewCategory;
