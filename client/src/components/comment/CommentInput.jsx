import { useEffect, useRef } from "react";
export default function CommentInput({ comment, setComment }) {
  const refTextArea = useRef(null);
  const autoReHeight = () => {
    if (refTextArea.current) {
      refTextArea.current.style.height = "auto";
      refTextArea.current.style.height =
        refTextArea.current.scrollHeight + "px";
    }
  };
  const handleChangeInput = (e) => {
    setComment(e.target.value);
  };
  useEffect(() => {
    autoReHeight();
  }, [comment]);
  return (
    <textarea
      ref={refTextArea}
      className={"w-full outline-none resize-none p-4 rounded-lg bg-base-100"}
      placeholder={"Viết bình luận..."}
      value={comment}
      onChange={handleChangeInput}
    />
  );
}
