import * as React from "react";
import Avatar from "../user/Avatar";
export default function MessageItem(props) {
    return (<div className="flex items-end space-x-2">
      <Avatar sizeAvatar="w-8"/>
      <div className="flex flex-col space-y-[2px]">
        <div className="text-colorIconMenu bg-backgroundGray py-1 px-2 text-sm rounded-full rounded-bl-lg w-fit">
          Từng ngày qua
        </div>
        <div className="text-colorIconMenu bg-backgroundGray py-1 px-2 text-sm rounded-full rounded-bl-xl rounded-tl-lg w-fit">
          Từng ngày qua
        </div>
        <div className="text-colorIconMenu bg-backgroundGray py-1 px-2 text-sm rounded-full rounded-tl-lg w-fit">
          Từng ngày qua anh đã mong chờ
        </div>
      </div>
    </div>);
}
