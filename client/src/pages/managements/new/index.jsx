import NewCategoryFilter from "@/components/filter/NewCategoryFilter";
import NewFilterSection from "@/components/filter/NewFilterSection";
import LayoutWithSideBar from "@/components/layout/LayoutWithSideBar";
import NewCategoryTable from "@/components/table/NewCategoryTable";
import NewTable from "@/components/table/NewTable";
import { NewAPI } from "apis/new";
import { NewCategoryAPI } from "apis/new-category";
import { LIMIT } from "configs/configs";
import React, { useEffect, useState } from "react";
import Tabs, { Tab } from "react-best-tabs";

const New = () => {
  const [news, setNews] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLegal, setIsLegal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [tabActive, setTabActive] = useState(1);

  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(LIMIT);
  const [offset, setOffset] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const [isActive, setIsActive] = useState(null);
  const [keyword, setKeyword] = useState("");

  const getNews = async (query) => {
    try {
      setIsClient(true);
      const q = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v || v === 0)
      );
      const res = await NewAPI.getNews(q);
      if (res) {
        setNews(res.news);
        setTotal(res.total);
        setPageCount(Math.ceil(res.total / limit));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getAllCategories = async (query) => {
    try {
      setIsClient(true);
      const q = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v || v === 0)
      );
      const res = await NewCategoryAPI.getAllCategories(q);
      if (res) {
        setCategories(res.categories);
        setTotal(res.total);
        setPageCount(Math.ceil(res.total / limit));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllCategories({ offset, limit });
  }, []);

  const handleSearch = () => {
    getNews({ offset, limit, keyword, isActive });
  };

  const handleSelectTab = (event, tab) => {
    switch (tab) {
      case 1: {
        getAllCategories({ offset: 0, limit });
      }
      case 2: {
        getNews({ offset: 0, limit: LIMIT, keyword });
        setIsActive(null);
        break;
      }
      case 3: {
        getNews({ offset: 0, limit: LIMIT, isActive: 1 });
        setIsActive(1);
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleTabNewClick = async (e) => {
    setPageActive(e.selected + 1);
    try {
      const newOffset = (e.selected * limit) % total;
      setOffset(newOffset);
      if (isActive) {
        getNews({ offset: newOffset, limit, isActive, keyword });
      } else {
        getNews({ offset: newOffset, limit, keyword });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddCategory = (item) => {
    setCategories([item, ...categories]);
  };

  return (
    <div className="xl:mx-8 lg:mx-2 custom-tab padding-mobile">
      {isClient && (
        <Tabs
          activeTab={tabActive}
          className="mt-5"
          ulClassName=""
          onClick={(e, tab) => handleSelectTab(e, tab)}
        >
          <Tab title="Danh mục tin tức" className="mr-10">
            <NewCategoryFilter
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
              handleAddCategory={handleAddCategory}
            />
            <NewCategoryTable
              categories={categories}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              setCategories={setCategories}
              total={total}
              pageCount={pageCount}
              setTotal={setTotal}
            />
          </Tab>
          <Tab title="Tất cả" className="mr-10">
            <NewFilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
              setNews={setNews}
              setTotal={setTotal}
            />
            <NewTable
              news={news}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              total={total}
              pageCount={pageCount}
              setNews={setNews}
              setTotal={setTotal}
            />
          </Tab>

          <Tab title="Đang hiển thị" className="mr-10">
            <NewFilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <NewTable
              news={news}
              total={total}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              pageCount={pageCount}
            />
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

New.Layout = LayoutWithSideBar;

export default New;
