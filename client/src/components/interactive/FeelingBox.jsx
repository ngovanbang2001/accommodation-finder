import { reactionsConfig } from "../../configs/configs";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import React from "react";
export const FeelingBox = React.forwardRef(({ handleReaction }, ref) => {
  const handleClick = (item) => {
    handleReaction(item);
  };
  return (
    <div
      ref={ref}
      className={
        "flex items-center space-x-3 p-1 w-fit rounded-full border-[1px] border-backgroundGray bg-white absolute left-0 -top-10 invisible"
      }
    >
      {reactionsConfig.map((item) => (
        <div
          className={"flex items-center cursor-pointer reaction-item"}
          id={`reaction-item-${item.id}`}
          key={item.id}
          onClick={() => handleClick(item)}
        >
          <Image
            src={item.icon}
            className={"object-cover"}
            width={32}
            height={32}
            alt={"icon-reaction"}
          />
          <Tooltip
            anchorId={`reaction-item-${item.id}`}
            place="top"
            content={item.label}
          />
        </div>
      ))}
    </div>
  );
});
FeelingBox.displayName = "FeelingBox";
export default FeelingBox;
