import { async } from "@firebase/util";
import { NewAPI } from "apis/new";
import { PostAPI } from "apis/post";
import { activeNewConfig, LIMIT } from "configs/configs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { strToSlug } from "utils/common";
import { formatDate } from "utils/moment";
import Paginate from "../common/Paginate";
import ModalComfirmDeleteNew from "../modal/ModalComfirmDeleteNew";

const NewTable = ({
  news,
  pageActive,
  pageCount,
  handleTabNewClick,
  total,
  setNews,
  setTotal,
}) => {
  const router = useRouter();
  const [selectedNew, setSelectedNew] = useState(null);
  const handleClickPreview = (post) => {
    const slug = strToSlug(post.title);
    router.push(`/new/preview/${slug}-${post.id}`);
  };

  const handleEdit = (post) => {
    const slug = strToSlug(post.title);
    router.push(`/new/edit/${slug}-${post.id}`);
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

  const handleDeleteNew = async (item) => {
    try {
      const res = await NewAPI.deleteNew(item.id);
      if (res.ok) {
        const modal = document.getElementById("modal-comfirm-delete-new-id");
        if (modal) {
          modal.click();
        }
        toast.success("Xóa bài viết thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        const temp = news.filter((i) => i.id !== item.id);
        setNews([...temp]);
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
      const res = await NewAPI.markDisplay({
        id: item.id,
        isActive: !item.isActive,
      });
      if (res.ok) {
        toast.success("Cập nhật bài viết thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const temp = { ...item, isActive: item.isActive ? 0 : 1 };
        const arr = news;
        for (const i in arr) {
          if (arr[i].id === temp.id) {
            arr[i] = temp;
            break;
          }
        }
        setNews([...arr]);
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

  const handleOutstanding = async (item) => {
    try {
      const res = await NewAPI.markOutstanding({
        id: item.id,
        isOutstanding: !item.isOutstanding,
      });
      if (res.ok) {
        toast.success("Cập nhật bài viết thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const temp = { ...item, isOutstanding: item.isOutstanding ? 0 : 1 };
        const arr = news;
        for (const i in arr) {
          if (arr[i].id === temp.id) {
            arr[i] = temp;
            break;
          }
        }
        setNews([...arr]);
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
    <div className="">
      <div className="overflow-x-auto w-full">
        <div className="flex items-center justify-between py-4">
          <div className="">
            Tất cả có <span className="font-bold">{total}</span> tin đăng
          </div>
        </div>
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>STT</th>
              <th>Ảnh bìa</th>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Ngày tạo</th>
              <th>Chỉnh sửa lần cuối</th>
              <th>Trạng thái</th>
              <th>Tin nổi bật</th>
              <th>Hiển thị</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {news?.length > 0 &&
              news.map((item, index) => (
                <tr key={item.id} className={"text-center text-sm"}>
                  <td className="text-center">{index + 1}</td>
                  <td className="flex justify-center">
                    <div className="relative w-[120px] h-[70px]">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        layout={"fill"}
                        className={"object-cover rounded-md mx-auto"}
                      />
                    </div>
                  </td>
                  <td className="!text-start overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-sm font-bold">
                    {item.title}
                  </td>
                  <td>
                    <span className="p-2 rounded-lg bg-blue-100 text-blue-500">
                      {item.category.name}
                    </span>
                  </td>
                  <td className="text-center text-sm">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="text-center text-sm">
                    {formatDate(item.updatedAt)}
                  </td>

                  <td className="text-center">
                    <span
                      className={`${renderClass(item.isActive)} p-2 rounded-lg`}
                    >
                      {activeNewConfig[item.isActive]}
                    </span>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle "
                      checked={item.isOutstanding}
                      onChange={() => handleOutstanding(item)}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle "
                      checked={item.isActive}
                      onChange={() => handleDisplay(item)}
                    />
                  </td>

                  <td className="">
                    <div className="flex items-center justify-center space-x-2">
                      <div
                        title="Xem chi tiết"
                        className="bg-primary py-1 px-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer"
                        onClick={() => handleClickPreview(item)}
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
                      <label htmlFor={"modal-comfirm-delete-new-2"}>
                        <div
                          title="Xóa"
                          className="bg-red-500 py-1 px-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer"
                          onClick={() => {
                            setSelectedNew(item);
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
        <ModalComfirmDeleteNew
          id={"modal-comfirm-delete-new-2"}
          handleClick={() => handleDeleteNew(selectedNew)}
          title={"Xóa bài viết"}
          id2={"modal-comfirm-delete-new-id"}
          description={"Bạn có chắc chắn muốn xóa bài viết này?"}
        />
      </div>
    </div>
  );
};

export default NewTable;
