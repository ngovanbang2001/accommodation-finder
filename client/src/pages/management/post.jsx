import ApprovalPostTable from '@/components/table/ApprovalPostTable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tabs, { Tab } from 'react-best-tabs'
import { LIMIT, roleConfig } from 'configs/configs'
import { PostAPI } from 'apis/post'
import FilterSection from '@/components/filter/FilterSection'

const Post = () => {
  const profile = useSelector((state) => state.auth.profile)
  const router = useRouter()
  const [isLegal, setIsLegal] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [tabActive, setTabActive] = useState(1)
  const [posts, setPosts] = useState([])

  const [pageCount, setPageCount] = useState(0)
  const [limit, setLimit] = useState(LIMIT)
  const [offset, setOffset] = useState(0)
  const [pageActive, setPageActive] = useState(1)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState(null)
  const [type, setType] = useState(null)
  const [category, setCategory] = useState(null)
  const [tradingForm, setTradingForm] = useState(null)
  const [isActive, setIsActive] = useState(null)

  const [keyword, setKeyword] = useState('')

  const getPosts = async (query) => {
    try {
      const q = Object.fromEntries(Object.entries(query).filter(([_, v]) => v || v === 0))
      q.userId = profile.id
      const res = await PostAPI.getAllPost(q)

      if (res.postData) {
        setPosts(res.postData)
        setTotal(res.total)
        setPageCount(Math.ceil(res.total / limit))
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    setIsClient(true)
    if (profile.role && !(profile.role === roleConfig.ADMIN)) {
      router.push('/')
    } else {
      setIsLegal(true)
    }
  }, [profile.id])

  useEffect(() => {
    if (profile.id) {
      getPosts({ offset, limit })
    }
  }, [profile])

  const handleSearch = () => {
    getPosts({
      offset,
      limit,
      type,
      category,
      tradingForm,
      keyword,
      status,
      isActive,
    })
  }

  const handleSelectTab = (event, tab) => {
    setOffset(0)
    setLimit(LIMIT)
    switch (tab) {
      case 1: {
        getPosts({
          offset: 0,
          limit: LIMIT,
          type,
          category,
          tradingForm,
          keyword,
        })
        setStatus(null)
        setTabActive(1)
        break
      }
      case 2: {
        setTabActive(2)
        getPosts({
          offset: 0,
          limit: LIMIT,
          status: 0,
          isActive: 1,
          type,
          category,
          tradingForm,
          keyword,
        })
        setStatus(0)
        setIsActive(1)
        break
      }
      case 3: {
        setTabActive(3)
        getPosts({
          offset: 0,
          limit: LIMIT,
          status: 1,
          isActive: 1,
          type,
          category,
          tradingForm,
          keyword,
        })
        setStatus(1)
        setIsActive(1)
        break
      }

      case 4: {
        setTabActive(4)
        getPosts({
          offset: 0,
          limit: LIMIT,
          status: 2,
          isActive: 1,
          type,
          category,
          tradingForm,
          keyword,
        })
        setIsActive(1)
        setStatus(2)
        break
      }
      case 5: {
        setTabActive(5)
        getPosts({
          offset: 0,
          limit: LIMIT,
          isActive: 1,
          status: 3,
          type,
          category,
          tradingForm,
          keyword,
        })
        setStatus(3)
        setIsActive(1)
        break
      }
      case 6: {
        setTabActive(6)
        getPosts({
          offset: 0,
          limit: LIMIT,
          isActive: 0,
          type,
          category,
          tradingForm,
          keyword,
        })
        setIsActive(0)
        setStatus(null)
        break
      }
      default: {
        break
      }
    }
  }

  const handleTabNewClick = async (e) => {
    setPageActive(e.selected + 1)
    try {
      const newOffset = (e.selected * limit) % total
      setOffset(newOffset)
      if (status) {
        getPosts({
          offset: newOffset,
          limit,
          status,
          type,
          category,
          tradingForm,
          keyword,
        })
      } else {
        getPosts({
          offset: newOffset,
          limit,
          type,
          category,
          tradingForm,
          keyword,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSelectType = async (option) => {
    setOffset(0)
    setLimit(5)
    getPosts({
      offset: 0,
      limit: LIMIT,
      type: option.value,
      category,
      tradingForm,
      keyword,
    })
    setType(option.value)
  }

  const handleSelectCategory = async (option) => {
    setOffset(0)
    setLimit(5)
    getPosts({
      offset: 0,
      limit: LIMIT,
      category: option.value,
      type,
      tradingForm,
      keyword,
    })
    setCategory(option.value)
  }

  const handleSelectTradingForm = async (option) => {
    setOffset(0)
    setLimit(5)
    getPosts({
      offset: 0,
      limit: LIMIT,
      tradingForm: option.value,
      type,
      category,
      keyword,
    })
    setTradingForm(option.value)
  }

  return (
    <div className="mx-auto container custom-tab padding-mobile">
      {isClient && (
        <Tabs
          activeTab={tabActive}
          className="mt-5"
          ulClassName=""
          onClick={(e, tab) => handleSelectTab(e, tab)}
        >
          <Tab title="Tất cả" className="mr-10">
            <div>
              <FilterSection
                handleSelectCategory={handleSelectCategory}
                handleSelectTradingForm={handleSelectTradingForm}
                handleSelectType={handleSelectType}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
              />
              {isLegal && (
                <ApprovalPostTable
                  tabActive={tabActive}
                  posts={posts}
                  pageActive={pageActive}
                  pageCount={pageCount}
                  handleTabNewClick={handleTabNewClick}
                  total={total}
                />
              )}
            </div>
          </Tab>

          <Tab title="Chờ duyệt" className="mr-10">
            <div>
              <FilterSection
                handleSelectCategory={handleSelectCategory}
                handleSelectTradingForm={handleSelectTradingForm}
                handleSelectType={handleSelectType}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
              />

              {isLegal && (
                <ApprovalPostTable
                  tabActive={tabActive}
                  posts={posts}
                  pageActive={pageActive}
                  pageCount={pageCount}
                  total={total}
                  handleTabNewClick={handleTabNewClick}
                />
              )}
            </div>
          </Tab>

          <Tab title="Đang hiển thị" className="mr-10">
            <div>
              <FilterSection
                handleSelectCategory={handleSelectCategory}
                handleSelectTradingForm={handleSelectTradingForm}
                handleSelectType={handleSelectType}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
              />

              {isLegal && (
                <ApprovalPostTable
                  tabActive={tabActive}
                  posts={posts}
                  pageActive={pageActive}
                  pageCount={pageCount}
                  total={total}
                  handleTabNewClick={handleTabNewClick}
                />
              )}
            </div>
          </Tab>
          <Tab title="Đã từ chối" className="mr-10">
            <div>
              <FilterSection
                handleSelectCategory={handleSelectCategory}
                handleSelectTradingForm={handleSelectTradingForm}
                handleSelectType={handleSelectType}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
              />

              {isLegal && (
                <ApprovalPostTable
                  tabActive={tabActive}
                  posts={posts}
                  pageActive={pageActive}
                  pageCount={pageCount}
                  total={total}
                  handleTabNewClick={handleTabNewClick}
                />
              )}
            </div>
          </Tab>
          <Tab title="Đã hết hạn" className="mr-10">
            <div>
              <FilterSection
                handleSelectCategory={handleSelectCategory}
                handleSelectTradingForm={handleSelectTradingForm}
                handleSelectType={handleSelectType}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
              />

              {isLegal && (
                <ApprovalPostTable
                  tabActive={tabActive}
                  posts={posts}
                  pageActive={pageActive}
                  pageCount={pageCount}
                  total={total}
                  handleTabNewClick={handleTabNewClick}
                />
              )}
            </div>
          </Tab>
          <Tab title="Đã ẩn" className="mr-10">
            <div>
              <FilterSection
                handleSelectCategory={handleSelectCategory}
                handleSelectTradingForm={handleSelectTradingForm}
                handleSelectType={handleSelectType}
                keyword={keyword}
                setKeyword={setKeyword}
                handleSearch={handleSearch}
              />

              {isLegal && (
                <ApprovalPostTable
                  tabActive={tabActive}
                  posts={posts}
                  pageActive={pageActive}
                  pageCount={pageCount}
                  total={total}
                  handleTabNewClick={handleTabNewClick}
                />
              )}
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  )
}

export default Post
