import * as React from "react";
export default function BackTop() {
  const [visible, setVisible] = React.useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);
  return (
    <>
      {visible && (
        <div
          className="z-10 bg-base-100 rounded-full w-[40px] h-[40px] border border-primary fixed bottom-5 right-5 flex items-center justify-center cursor-pointer"
          onClick={scrollToTop}
        >
          <i className="fa-regular fa-arrow-up text-primary"></i>
        </div>
      )}
    </>
  );
}
