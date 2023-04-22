import SideBar from '@/components/common/SideBar'
import AccountFilterSection from '@/components/filter/AccountFilterSection'
import LayoutWithSideBar from '@/components/layout/LayoutWithSideBar'
import AccountTable from '@/components/table/AccountTable'
import { userAPI } from 'apis/user'
import { LIMIT } from 'configs/configs'
import React, { useEffect, useState } from 'react'
import Tabs, { Tab } from 'react-best-tabs'

const Account = () => {
  const [accounts, setAccounts] = useState(null)
  const [isLegal, setIsLegal] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [tabActive, setTabActive] = useState(1)

  const [total, setTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [limit, setLimit] = useState(LIMIT)
  const [offset, setOffset] = useState(0)
  const [pageActive, setPageActive] = useState(1)
  const [isActive, setIsActive] = useState(null)
  const [role, setRole] = useState(null)
  const [keyword, setKeyword] = useState('')

  const getAccounts = async (query) => {
    try {
      setIsClient(true)
      const q = Object.fromEntries(Object.entries(query).filter(([_, v]) => v || v === 0))
      const res = await userAPI.getAllAccounts(q)
      if (res) {
        setAccounts(res.accounts)
        setTotal(res.total)
        setPageCount(Math.ceil(res.total / limit))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSearch = () => {
    getAccounts({ offset, limit, keyword, isActive })
  }
  useEffect(() => {
    getAccounts({ offset, limit })
  }, [])

  const handleSelectTab = (event, tab) => {
    switch (tab) {
      case 1: {
        getAccounts({ offset: 0, limit: LIMIT, keyword })
        setIsActive(null)
        setRole(null)
        break
      }
      case 2: {
        getAccounts({ offset: 0, limit: LIMIT, isActive: 1, keyword })
        setIsActive(1)
        setRole(null)
        break
      }
      case 3: {
        getAccounts({ offset: 0, limit: LIMIT, isActive: 0, keyword })
        setIsActive(0)
        setRole(null)
        break
      }
      case 4: {
        getAccounts({ offset: 0, limit: LIMIT, isActive: 1, role: 0, keyword })
        setIsActive(1)
        setRole(0)
        break
      }
      case 5: {
        getAccounts({ offset: 0, limit: LIMIT, isActive: 1, role: 1, keyword })
        setIsActive(1)
        setRole(1)
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
      if (isActive) {
        getAccounts({ offset: newOffset, limit, isActive, keyword })
      } else {
        getAccounts({ offset: newOffset, limit, keyword })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="custom-tab padding-mobile xl:mx-8 lg:mx-2">
      {isClient && (
        <Tabs
          activeTab={tabActive}
          className="mt-5"
          ulClassName=""
          onClick={(e, tab) => handleSelectTab(e, tab)}
        >
          <Tab title="Tất cả" className="mr-10">
            <AccountFilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <AccountTable
              accounts={accounts}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              total={total}
              pageCount={pageCount}
            />
          </Tab>

          <Tab title="Tài khoản bình thường" className="mr-10">
            <AccountFilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <AccountTable
              accounts={accounts}
              total={total}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              pageCount={pageCount}
            />
          </Tab>
          <Tab title="Tài khoản bị khóa" className="mr-10">
            <AccountFilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <AccountTable
              accounts={accounts}
              total={total}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              pageCount={pageCount}
            />
          </Tab>
          <Tab title="Tài khoản người dùng" className="mr-10">
            <AccountFilterSection
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <AccountTable
              accounts={accounts}
              total={total}
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              pageCount={pageCount}
            />
          </Tab>
        </Tabs>
      )}
    </div>
  )
}

Account.Layout = LayoutWithSideBar

export default Account
