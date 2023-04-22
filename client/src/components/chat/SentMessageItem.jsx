import * as React from "react";
export default function SentMessageItem(props) {
    return (<div className="flex flex-col space-y-[2px] items-end float-right">
      <div className="text-white py-1 px-2 text-sm rounded-full rounded-br-lg w-fit bg-primary ">
        Từng ngày qua
      </div>
      <div className="text-white py-1 px-2 text-sm rounded-full rounded-tr-xl bg-primary rounded-br-lg w-fit">
        Từng ngày qua
      </div>
      <div className="text-white py-1 px-2 text-sm rounded-full rounded-tr-lg bg-primary w-fit">
        Từng ngày qua anh đã mong chờ
      </div>
    </div>);
}
