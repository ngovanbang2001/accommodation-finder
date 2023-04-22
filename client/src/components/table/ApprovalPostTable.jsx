import { PostAPI } from "apis/post";
import { PostTypeAPI } from "apis/post-type";
import { LIMIT, typePostConfig } from "configs/configs";
import moment from "moment/moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { strToSlug } from "utils/common";
import { formatDate } from "utils/moment";
import Paginate from "../common/Paginate";
import StatusLabel from "../status/StatusLabel";
import Avatar from "../user/Avatar";
import FullName from "../user/FullName";

const ApprovalPostTable = ({
  posts,
  pageActive,
  pageCount,
  handleTabNewClick,
  total,
  tabActive,
}) => {
  const router = useRouter();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await PostTypeAPI.getPostTypes({ limit: 20, offset: 0 });
        if (res.postTypes) {
          setTypes(res.postTypes);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const renderClass = (type) => {
    switch (type) {
      case 1: {
        return "bg-green-100 text-green-500 text-sm";
      }
      case 2: {
        return "bg-purple-100 text-purple-500 text-sm";
      }
      case 3: {
        return "bg-blue-100 text-blue-500 text-sm";
      }
    }
  };

  const handleClickPreview = (post) => {
    const slug = strToSlug(post.title);
    router.push(`/post/preview/${slug}-${post.id}`);
  };

  const getPostType = (typeId) => {
    const typeItem = types.find((item) => item.id === typeId);
    if (typeItem) {
      return typeItem.title;
    }
  };

  return (
    <div className="">
      {posts.length ? (
        <div className="overflow-x-auto w-full ">
          <span>
            Tất cả có <span className="font-bold">{total}</span> tin đăng
          </span>
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>Người đăng</th>
                <th>Loại tin</th>
                <th>Ảnh bìa</th>
                <th>Tiêu đề</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày hết hạn</th>
                <th>Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {posts?.length > 0 &&
                posts.map((item, index) => (
                  <tr key={item.id}>
                    <td className="">
                      <div className="flex flex-col justify-center space-y-2 items-center">
                        <Avatar sizeAvatar={"w-7"} avatar={item.user.avatar} />
                        <FullName
                          fullName={item.user.displayName}
                          className={"text-sm"}
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        className={`bg-green-100 p-1 rounded-lg w-[90px] text-center text-sm text-green-500`}
                      >
                        {getPostType(item.type)}
                      </div>
                    </td>
                    <td className="flex justify-center">
                      <div className="relative w-[120px] h-[70px]">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          layout={"fill"}
                          placeholder={"blur"}
                          blurDataURL={item.images[0]}
                          className={"object-cover rounded-md mx-auto"}
                        />
                      </div>
                    </td>
                    <td className=" overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-sm font-bold">
                      {item.title}
                    </td>
                    <td className="text-center">
                      {tabActive !== 6 ? (
                        <StatusLabel
                          status={item.status}
                          isActive={item.isActive}
                        />
                      ) : (
                        <div className="bg-gray-100 text-gray-500 text-sm p-1 rounded-lg">
                          Đã ẩn
                        </div>
                      )}
                    </td>
                    <td className="text-center text-sm">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="text-center text-sm">
                      {item.duration
                        ? moment.unix(item.duration / 1000).format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td className="">
                      <div
                        // htmlFor="modal-preview-post"
                        className="bg-primary py-1 text-sm rounded-lg text-white space-x-1 flex justify-center items-center cursor-pointer"
                        onClick={() => handleClickPreview(item)}
                      >
                        <i className="fa-light fa-eye"></i>
                        <span>Chi tiết</span>
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
        </div>
      ) : (
        <div className="pt-8 pb-12 text-center">Không có tin đăng nào.</div>
      )}
    </div>
  );
};

export default ApprovalPostTable;
