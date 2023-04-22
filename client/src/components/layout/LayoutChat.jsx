import React, { useEffect, useState } from "react";
import BackTop from "./BackTop";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function LayoutChat({ children }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    function handleChangeTheme() {
      const themeLocalStorage = localStorage.getItem("theme");
      if (themeLocalStorage) {
        setTheme(themeLocalStorage);
      } else {
        setTheme("light");
      }
    }
    handleChangeTheme();
    window.addEventListener("storage", handleChangeTheme);
    return () => {
      window.removeEventListener("storage", handleChangeTheme);
    };
  }, []);
  return (
    <div data-theme={theme}>
      <Navbar />
      <main className="-mt-[74px]">{children}</main>
      <BackTop />
    </div>
  );
}
