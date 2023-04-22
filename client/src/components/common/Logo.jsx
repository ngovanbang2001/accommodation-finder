import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import logo_transperent from "../../assets/images/logo_transperent.png";
export default function Logo(props) {
  const router = useRouter();

  const { width } = useWindowSize();
  const user = useSelector((state) => state.auth.profile);
  const goBackHome = () => {
    if (user?.role > 0) {
    } else {
      router.push("/");
    }
  };
  return (
    <div
      className={`${user?.role > 0 ? "" : "cursor-pointer"} relative ${
        width >= 1024 ? "w-[185px] h-[50px]" : "w-[120px] h-[20px]"
      }`}
      onClick={goBackHome}
    >
      <Image
        src={width >= 1024 ? logo : logo_transperent}
        alt=""
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}
