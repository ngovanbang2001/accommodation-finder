import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { strToSlug } from "utils/common";
import { formatDate } from "utils/moment";
import Paginate from "../common/Paginate";
import StatusLabel from "../status/StatusLabel";

const PostTable = ({
  posts,
  pageActive,
  pageCount,
  handleTabNewClick,
  total,
}) => {
  const router = useRouter();

  const handleClickPreview = (post) => {
    const slug = strToSlug(post.title);
    router.push(`/post/preview/${slug}-${post.id}`);
  };

  return (
    <div className="">
      <div className="overflow-x-auto w-full ">
        <span>
          Tất cả có <span className="font-bold">{total}</span> tin đăng
        </span>
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>STT</th>
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
                <tr key={item.id} className={"text-center"}>
                  <td className="text-center">{index + 1}</td>
                  <td className="flex justify-center">
                    <div className="relative w-[120px] h-[70px]">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        layout={"fill"}
                        className={"object-cover rounded-md mx-auto"}
                      />
                    </div>
                  </td>
                  <td className="!text-start overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-sm font-bold">
                    {item.title}
                  </td>
                  <td className="text-center">
                    <StatusLabel status={item.status} />
                  </td>
                  <td className="text-center text-sm">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="">
                    {moment.unix(item.duration / 1000).format("DD/MM/YYYY")}
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
        <Paginate
          handleTabNewClick={handleTabNewClick}
          pageActive={pageActive}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default PostTable;
