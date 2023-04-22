import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BackTop from "./BackTop";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
export default function MainLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const user = useSelector((state) => state.auth.profile);
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
      {user && user.role > 0 ? <NavbarAdmin /> : <Navbar />}
      <main>{children}</main>
      <BackTop />
      <Footer />
    </div>
  );
}
