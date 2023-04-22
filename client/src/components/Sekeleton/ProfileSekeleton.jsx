import React from "react";

const ProfileSekeleton = () => {
  return (
    <div>
      <div className="bg-base-100">
        <div className="container mx-auto pb-8">
          <div className="bg-slate-200 animate-pulse lg:h-[400px] md:h-[300px] h-[200px] rounded-bl-xl rounded-br-xl"></div>
          <div className={"relative w-full"}>
            <div
              className={
                "absolute lg:left-10 left-2/4 lg:-translate-x-0 -translate-x-2/4 -top-1/2 -translate-y-2/4 z-10"
              }
            >
              <div className="md:w-[160px] md:h-[160px] w-[130px] h-[130px] rounded-full bg-slate-200"></div>
            </div>
          </div>
          <div className="lg:mt-5 md:mt-24 mt-20 lg:ml-[255px] lg:w-fit w-full flex items-center justify-center">
            <div className="bg-slate-200 animate-pulse h-8 w-[300px] rounded-lg"></div>
          </div>
        </div>
        <div className="grid-cols-3 lg:grid lg:space-x-5 lg:p-4 lg:px-0 container mx-auto">
          <div className="col-span-1 h-fit">
            <div className="bg-slate-200 animate-pulse h-[100px] lg:rounded-lg"></div>
          </div>
          <div className="col-span-2 h-fit lg:mt-0 mt-4">
            <div className="bg-slate-200 animate-pulse h-[40px] lg:rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSekeleton;
