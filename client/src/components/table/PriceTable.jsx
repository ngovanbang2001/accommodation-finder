import { async } from "@firebase/util";
import { PostTypeAPI } from "apis/post-type";
import { activePostTypeConfig, LIMIT } from "configs/configs";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { formatPrice, strToSlug } from "utils/common";
import { formatDate } from "utils/moment";
import Paginate from "../common/Paginate";
import ModalComfirmDeleteNew from "../modal/ModalComfirmDeleteNew";
import ModalCreatePostType from "../modal/ModalCreatePostType";
import ModalDetailPostType from "../modal/ModalCreateNewCategory";
import StatusLabel from "../status/StatusLabel";
const PriceTable = ({
  postTypes,
  pageActive,
  pageCount,
  handleTabNewClick,
  total,
  setPostTypes,
}) => {
  const router = useRouter();
  const [selectedPostType, setSelectedPostType] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const handleClickPreview = (post) => {
    const slug = strToSlug(post.title);
    router.push(`/post/preview/${slug}-${post.id}`);
  };

  const updatePostTypes = (item, type) => {
    if (type === "add") {
      setPostTypes((postTypes) => [...postTypes, item]);
    } else {
      let tempArr = postTypes;
      for (const i in tempArr) {
        if ((tempArr[i].id = item.id)) {
          tempArr[i] = item;
          break;
        }
      }
      setPostTypes([...tempArr]);
    }
  };

  const handleShowModal = () => {
    setIsEdit(false);
    const modal = document.getElementById("modal-create-post-type");
    if (modal) {
      modal.click();
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setSelectedPostType(item);
    const modal = document.getElementById("modal-create-post-type");
    if (modal) {
      modal.click();
    }
  };

  const handleClickDetail = (item) => {
    setSelectedPostType(item);
    const modal = document.getElementById("modal-detail-post-type");
    if (modal) {
      modal.click();
    }
  };

  const handleDeletePostType = async (item) => {
    try {
      const res = await PostTypeAPI.deletePostType(item.id);
      if (res.ok) {
        const modal = document.getElementById("modal-comfirm-delete-post-type");
        if (modal) {
          modal.click();
        }
        const tempArr = postTypes.filter((i) => i.id !== item.id);
        setPostTypes([...tempArr]);
        toast.success("Xóa loại tin thành công!", {
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

  const renderClass = (status) => {
    switch (status) {
      case 0: {
        return "bg-orange-100 text-orange-500 text-sm";
      }
      case 1: {
        return "bg-green-100 text-green-500 text-sm";
      }
    }
  };

  const handleActivePostType = async (item) => {
    try {
      const res = await PostTypeAPI.updatePostType({
        id: item.id,
        data: { status: item.status ? 0 : 1 },
      });
      if (res.ok) {
        toast.success("Kích hoạt thành công!", {
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
        const arr = postTypes;
        for (const i in arr) {
          if (arr[i].id === temp.id) {
            arr[i] = temp;
            break;
          }
        }
        setPostTypes([...arr]);
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
      console.log(e);
    }
  };

  return (
    <div className="">
      <div className="overflow-x-auto w-full ">
        <div className="md:flex items-center justify-between py-2">
          <div>
            Tất cả có <span className="font-bold">{total}</span> loại tin
          </div>
          <div
            className="my-2 md:mt-0 w-[200px] bg-primary p-3 rounded-lg text-white flex items-center justify-center space-x-1 cursor-pointer"
            onClick={handleShowModal}
          >
            <i className="fa-regular fa-plus text-xs"></i>
            <span className="font-bold text-sm">Tạo loại tin mới</span>
          </div>
        </div>
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>STT</th>
              <th>Loại tin</th>
              <th>Giá tiền</th>
              <th>Mô tả</th>
              <th>Ưu điểm</th>
              <th>Trạng thái</th>
              <th>Kích hoạt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {postTypes?.length > 0 &&
              postTypes.map((item, index) => (
                <tr key={item.id} className={"text-center text-sm"}>
                  <td className="text-center">{index + 1}</td>
                  <td className="!text-start overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-sm font-bold">
                    {item.title}
                  </td>
                  <td>
                    <div className={"flex space-x-2 items-center"}>
                      <div>
                        <div className="p-1 rounded-lg bg-orange-100 text-orange-500">
                          {formatPrice(item.priceForDay)} <span>&#8363;</span> /
                          ngày
                        </div>
                      </div>
                      <div>
                        <div className="p-1 rounded-lg bg-green-100 text-green-500">
                          {formatPrice(item.priceForWeek)} <span>&#8363;</span>{" "}
                          / tuần
                        </div>
                      </div>
                      <div>
                        <div className="p-1 rounded-lg bg-blue-100 text-blue-500">
                          {formatPrice(item.priceForMonth)} <span>&#8363;</span>{" "}
                          / tháng
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px]">
                    {item.description}
                  </td>
                  <td className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px]">
                    {item.features.split("\n").join(",")}
                  </td>
                  <td>
                    <div>
                      <div
                        className={`p-1 rounded-lg ${renderClass(item.status)}`}
                      >
                        {activePostTypeConfig[item.status]}
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle "
                      checked={item.status}
                      onChange={() => handleActivePostType(item)}
                    />
                  </td>
                  <td>
                    <div className="flex items-center justify-center space-x-2">
                      <div
                        title="Xem chi tiết"
                        className="bg-primary py-1 px-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer"
                        onClick={() => handleClickDetail(item)}
                      >
                        <i className="fa-light fa-eye text-sm"></i>
                      </div>
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
                            setSelectedPostType(item);
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
        {total > LIMIT && (
          <Paginate
            handleTabNewClick={handleTabNewClick}
            pageActive={pageActive}
            pageCount={pageCount}
          />
        )}
        <ModalCreatePostType
          id={"modal-create-post-type"}
          isEdit={isEdit}
          selectedPostType={selectedPostType}
          updatePostTypes={updatePostTypes}
        />

        <ModalComfirmDeleteNew
          id={"modal-comfirm-delete-new"}
          id2={"modal-comfirm-delete-post-type"}
          title={"Xác nhận xóa loại tin"}
          description={"Bạn có chắc chắn muốn xóa loại tin này?"}
          handleClick={() => handleDeletePostType(selectedPostType)}
        />

        <ModalDetailPostType
          id={"modal-detail-post-type"}
          item={selectedPostType}
        />
      </div>
    </div>
  );
};

export default PriceTable;
