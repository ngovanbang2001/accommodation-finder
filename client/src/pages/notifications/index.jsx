import NotificationITem from '@/components/notification/NotificationItem'
import { notificationAPI } from 'apis/notification'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
  const [tabActive, setTabActive] = useState(1)

  const getAllNoitification = async ({ o, type }) => {
    try {
      let res = null
      if (type === 1) {
        res = await notificationAPI.getNotifications({ offset: o, limit })
      } else if (type === 2) {
        res = await notificationAPI.getNotificationsUnViewed({
          offset: o,
          limit,
        })
      }
      if (res.notifications.length) {
        setNotifications(res.notifications)
        setTotal(res.total)
        if (res.notifications.length === res.total) {
          setHasMore(false)
        }
      } else {
        setNotifications([])
        setHasMore(false)
      }
    } catch (e) {
      console.log(e)
      setHasMore(false)
    }
  }
  const getMoreNotification = async () => {
    try {
      setLoading(true)
      const res = await notificationAPI.getNotifications({
        offset: page * limit,
        limit,
      })
      setLoading(false)
      if (res.rows.length) {
        setNotifications([...notifications, ...res.rows])
      } else {
        setHasMore(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
      setHasMore(false)
    }
  }

  useEffect(() => {
    getAllNoitification({ o: 0, type: 1 })
  }, [])

  const handleGetNotifcations = async (index) => {
    switch (index) {
      case 1: {
        setOffset(0)
        getAllNoitification({ o: 0, type: 1 })
        setTabActive(1)
        break
      }
      case 2: {
        setOffset(0)
        getAllNoitification({ o: 0, type: 2 })
        setTabActive(2)
        break
      }
    }
  }

  const renderClass = (index) => {
    if (tabActive === index) {
      return `bg-secondary text-white`
    } else {
      return `border border-secondary text-secondary`
    }
  }
  return (
    <div className="max-w-[700px] mx-auto py-4 box-shadow my-8 rounded-lg px-4">
      <h2 className="m-0">Thông báo</h2>
      <div className="flex items-center py-2 space-x-3">
        <div
          className={`w-[100px] rounded-2xl normal-case ${renderClass(
            1
          )} text-center py-1.5 text-sm font-bold cursor-pointer`}
          onClick={() => handleGetNotifcations(1)}
        >
          Tất cả
        </div>
        <div
          className={`w-[100px] rounded-2xl normal-case  text-center py-1.5 text-sm font-bold cursor-pointer ${renderClass(
            2
          )}`}
          onClick={() => handleGetNotifcations(2)}
        >
          Chưa đọc
        </div>
      </div>
      {notifications.length > 0 ? (
        <InfiniteScroll
          dataLength={notifications}
          next={getMoreNotification}
          hasMore={hasMore}
          endMessage={<div className="text-sm font-normal text-center">Đã tải hết thông báo.</div>}
          scrollableTarget={'scroll-notification'}
          loader={<span>Đang tải...</span>}
        >
          {notifications.map((notification) => (
            <NotificationITem notification={notification} key={notification.id} />
          ))}
        </InfiniteScroll>
      ) : (
        <div className="font-normal text-sm py-4 text-center">Hiện tại, không có thông báo.</div>
      )}
    </div>
  )
}

export default Notifications
