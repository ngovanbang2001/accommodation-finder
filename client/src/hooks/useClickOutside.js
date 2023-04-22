import { useEffect, useRef, useState } from "react";

export default function useClickOutside() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        nodeRef.current &&
        // !nodeRef.current.contains(e.target) &&
        e.target.classList.contains("bg-overlay") &&
        !e.target.matches("i")
      ) {
        setShow(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}
