import { NewAPI } from "apis/new";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import hanoi from "@/assets/images/area-motel-room/ha_noi.jpg";
import LatestNew from "@/components/blog/LatestNew";
import { formatDate } from "utils/moment";
export async function getServerSideProps({ params }) {
  let newData = {};
  try {
    const id = params.slug.split("-").slice(-1);
    newData = await NewAPI.getNewById(id);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      newData,
    },
  };
}
const DetailNew = ({ newData }) => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await NewAPI.getLatestNews(newData.id);
        if (res) {
          setLatestNews(res);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <Fragment>
      {newData.id ? (
        <div className="container mx-auto py-6 px-4">
          <div className="md:grid grid-cols-12 md:space-x-5">
            <div className="col-span-8">
              <h1 className="my-2 lg:text-4xl text-2xl">{newData.title}</h1>
              <div className="flex items-center space-x-2">
                <i className="fa-regular fa-clock"></i>
                <span className="text-sm">{formatDate(newData.createdAt)}</span>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: newData.content }}
                className={"my-4"}
              ></div>
            </div>
            <div className="col-span-4">
              <div className="sticky top-[80px] right-0">
                <div className="font-bold pb-2 text-lg">Tin mới nhất</div>
                <div className="flex flex-col space-y-3">
                  {latestNews.map((item) => (
                    <LatestNew key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default DetailNew;
