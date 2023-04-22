import LayoutWithSideBar from '@/components/layout/LayoutWithSideBar'
import PriceTable from '@/components/table/PriceTable'
import { PostTypeAPI } from 'apis/post-type'
import { LIMIT } from 'configs/configs'
import React, { useEffect, useState } from 'react'
import Tabs, { Tab } from 'react-best-tabs'
const Price = () => {
  const [postTypes, setPostTypes] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [tabActive, setTabActive] = useState(1)

  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [limit, setLimit] = useState(LIMIT)
  const [offset, setOffset] = useState(0)
  const [pageActive, setPageActive] = useState(1)
  const [status, setStatus] = useState(null)

  const getPostTypes = async (query) => {
    try {
      const q = Object.fromEntries(Object.entries(query).filter(([_, v]) => v || v === 0))
      const res = await PostTypeAPI.getPostTypes(q)
      if (res.postTypes) {
        setTotal(res.total)
        setPostTypes(res.postTypes)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    ;(async () => {
      setIsClient(true)
      getPostTypes({ offset, limit })
    })()
  }, [])

  const handleSelectTab = (event, tab) => {
    switch (tab) {
      case 1: {
        getPostTypes({ offset: 0, limit: LIMIT })
        break
      }
      case 2: {
        getPostTypes({
          offset: 0,
          limit: LIMIT,
          status: 1,
        })
        setStatus(1)
        break
      }
      case 3: {
        getPostTypes({
          offset: 0,
          limit: LIMIT,
          status: 0,
        })
        setStatus(0)
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
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="xl:mx-8 lg:mx-2 custom-tab padding-mobile">
      {isClient && (
        <Tabs
          activeTab={tabActive}
          className="mt-5"
          ulClassName=""
          activityClassName={{ background: 'red' }}
          onClick={(e, tab) => handleSelectTab(e, tab)}
        >
          <Tab title="Tất cả" className="mr-10">
            <PriceTable
              postTypes={postTypes}
              setPostTypes={setPostTypes}
              total={total}
              pageActive={pageActive}
              pageCount={pageCount}
              handleTabNewClick={handleTabNewClick}
            />
          </Tab>

          <Tab title="Đang đang kích hoạt" className="mr-10">
            <PriceTable
              postTypes={postTypes}
              setPostTypes={setPostTypes}
              total={total}
              pageCount={pageCount}
              pageActive={pageActive}
              handleTabNewClick={handleTabNewClick}
            />
          </Tab>

          <Tab title="Đang bỏ kích hoạt" className="mr-10">
            <PriceTable postTypes={postTypes} setPostTypes={setPostTypes} total={total} />
          </Tab>
        </Tabs>
      )}
    </div>
  )
}
Price.Layout = LayoutWithSideBar
export default Price
