import React from "react";

const PostSekeleton = () => {
  return (
    <div className="md:w-[372px] w-[360px] mx-3 h-[380px] rounded-lg">
      <div className="animate-pulse h-[180px] bg-slate-200 rounded-tl-lg rounded-tr-lg"></div>
      <div className={"animate-pulse h-6 bg-slate-200 rounded-lg my-2 w-1/2"}></div>
      <div className={"animate-pulse h-6 bg-slate-200 rounded-lg my-2"}></div>
      <div className={"animate-pulse h-16 bg-slate-200 rounded-lg my-2"}></div>
      <div className="flex items-center justify-between my-2">
        <div
          className={"animate-pulse h-4 bg-slate-200 rounded-lg w-[150px]"}
        ></div>
        <div
          className={"animate-pulse h-4 bg-slate-200 rounded-lg w-[150px]"}
        ></div>
      </div>
    </div>
  );
};

export default PostSekeleton;
