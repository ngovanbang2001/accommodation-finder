import { async } from "@firebase/util";
import { NewAPI } from "apis/new";
import { NewCategoryAPI } from "apis/new-category";
import { PostAPI } from "apis/post";
import { activeNewConfig, LIMIT } from "configs/configs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setPreviewPost } from "store/post/post-slice";
import { strToSlug } from "utils/common";
import { formatDate } from "utils/moment";
import ButtonPrimary from "../button/ButtonPrimary";
import Paginate from "../common/Paginate";
import ModalComfirmDeleteNew from "../modal/ModalComfirmDeleteNew";
import ModalCreateNewCategory from "../modal/ModalCreateNewCategory";
import ModalEditNewCategory from "../modal/ModalEditNewCategory";

const NewCategoryTable = ({
  categories,
  pageActive,
  pageCount,
  setCategories,
  handleTabNewClick,
  total,
  setTotal,
}) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (cate) => {
    setSelectedCategory(cate);
    const modal = document.getElementById("modal-edit-new-category-id");
    if (modal) {
      modal.click();
    }
  };

  const renderClass = (isActive) => {
    switch (isActive) {
      case 0: {
        return "bg-orange-100 text-orange-500 text-sm";
      }
      case 1: {
        return "bg-green-100 text-green-500 text-sm";
      }
    }
  };

  const handleDeleteCategory = async (item) => {
    try {
      const res = await NewCategoryAPI.deleteCategory(item.id);
      if (res.ok) {
        const modal = document.getElementById("modal-comfirm-delete-category");
        if (modal) {
          modal.click();
        }
        toast.success("Xóa danh mục thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        const temp = categories.filter(
          (item) => item.id !== selectedCategory.id
        );
        setCategories([...temp]);
        setTotal(total - 1);
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

  const handleDisplay = async (item) => {
    try {
      const res = await NewCategoryAPI.markDisplay({
        id: item.id,
        status: !item.status,
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
        const temp = { ...item, status: item.status ? 0 : 1 };
        const arr = categories;
        for (const i in arr) {
          if (arr[i].id === temp.id) {
            arr[i] = temp;
            break;
          }
        }
        setCategories([...arr]);
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

  const handleUpdateData = (item) => {
    const temp = [...categories];
    for (let i in categories) {
      if (temp[i].id === item.id) {
        temp[i] = item;
        break;
      }
    }
    setCategories([...temp]);
  };

  return (
    <div className="">
      <div className="overflow-x-auto w-full">
        <div className="flex items-center justify-between py-4">
          <div className="">
            Tất cả có <span className="font-bold">{categories?.length}</span>{" "}
            danh mục
          </div>
        </div>
        <table className="table w-full">
          <thead>
            <tr className="text-center text-sm">
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Kích hoạt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 &&
              categories.map((item, index) => (
                <tr key={item.id} className={"text-center text-sm"}>
                  <td className="text-center">{index + 1}</td>

                  <td className="!text-start overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-sm font-bold">
                    {item.name}
                  </td>

                  <td className="text-center">
                    <span>{formatDate(item.createdAt)}</span>
                  </td>
                  <td>
                    <span
                      className={`${renderClass(item.status)} p-2 rounded-lg`}
                    >
                      {activeNewConfig[item.status]}
                    </span>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle "
                      checked={item.status}
                      onChange={() => handleDisplay(item)}
                    />
                  </td>
                  <td className="">
                    <div className="flex items-center justify-center space-x-2">
                      <div
                        title="Chỉnh sửa"
                        className="bg-green-500 py-1 px-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="fa-light fa-pencil text-sm"></i>
                      </div>
                      <label htmlFor={"modal-comfirm-delete-new"}>
                        <div
                          title="Xóa"
                          className="bg-red-500 py-1 px-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(item);
                          }}
                        >
                          <i className="fa-light fa-trash-can text-sm"></i>
                        </div>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {categories?.length > LIMIT && (
          <Paginate
            handleTabNewClick={handleTabNewClick}
            pageActive={pageActive}
            pageCount={pageCount}
          />
        )}
        <ModalComfirmDeleteNew
          id={"modal-comfirm-delete-new"}
          handleClick={() => handleDeleteCategory(selectedCategory)}
          id2={"modal-comfirm-delete-category"}
          title={"Xóa danh mục"}
          description={"Bạn có chắc chắn muốn xóa danh mục tin tức này?"}
        />
        <ModalEditNewCategory
          id={"modal-edit-category"}
          selectedCategory={selectedCategory}
          handleUpdateData={handleUpdateData}
        />
      </div>
    </div>
  );
};

export default NewCategoryTable;
