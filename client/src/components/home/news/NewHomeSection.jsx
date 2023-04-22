import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSeeMore from "@/components/button/ButtonSeeMore";
import TitleSection from "@/components/common/TitleSection";
import NewSekeleton from "@/components/Sekeleton/NewSekeleton";
import { async } from "@firebase/util";
import { NewAPI } from "apis/new";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import NewHomeItem from "./NewHomeItem";
export default function NewHomeSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/blog");
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await NewAPI.getNews({ offset: 0, limit: 5, isActive: 1 });
        if (res) {
          setNews(res.news);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="container mx-auto padding-mobile py-8">
      {loading ? (
        <Fragment>
          <div className="flex items-center justify-center">
            <div
              className={
                "animate-pulse h-6 w-[250px] bg-slate-200 rounded-lg my-2"
              }
            ></div>
          </div>
          <NewSekeleton />
          <NewSekeleton />
          <NewSekeleton />
        </Fragment>
      ) : (
        <Fragment>
          <TitleSection title="Kinh nghiệm bất động sản" />
          {news.length > 0 &&
            news.map((item) => <NewHomeItem key={item.id} item={item} />)}
          <div className="flex justify-center">
            <ButtonPrimary
              handleClick={handleClick}
              title={"Xem thêm"}
              className={"w-[200px]"}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
