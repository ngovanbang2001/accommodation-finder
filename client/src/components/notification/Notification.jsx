import { async } from '@firebase/util'
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import { notificationAPI } from 'apis/notification'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import NotificationITem from './NotificationItem'
export default function Notification(props) {
  const [notifications, setNotifications] = useState([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(20)
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)

  const getNumberNotificationUnViewed = async () => {
    const totalRes = await notificationAPI.getTotalNotificationUnViewed()
    if (totalRes.total) {
      setTotal(totalRes.total)
    }
  }
  const getAllNoitification = async ({ o }) => {
    try {
      const res = await notificationAPI.getNotifications({ offset: o, limit })
      if (res.notifications.length) {
        setNotifications(res.notifications)
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

  useEffect(() => {
    getNumberNotificationUnViewed()
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', async (e) => {
        try {
          getNumberNotificationUnViewed()
        } catch (e) {
          console.log(e)
        }
      })
    }
  }, [])

  const getMoreNotification = async () => {
    try {
      setLoading(true)
      const res = await notificationAPI.getNotifications({
        offset: offset + limit,
        limit,
      })
      setOffset(offset + limit)
      setLoading(false)
      if (res.notifications.length) {
        setNotifications([...notifications, ...res.notifications])
      } else {
        setHasMore(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
      setHasMore(false)
    }
  }
  const markAllViewed = async () => {
    try {
      await notificationAPI.markAllViewed()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Menu
      offsetY={10}
      onMenuChange={(e) => {
        if (e.open) {
          setTotal(0)
          getAllNoitification({ o: 0 })
          if (total) {
            markAllViewed()
          }
        }
      }}
      menuButton={
        <MenuButton className={'relative'}>
          <i className="fa-sharp fa-solid fa-bell text-colorIconMenu text-lg"></i>
          {total > 0 && (
            <div className="absolute -top-1 -right-5 bg-red-500 text-white rounded-full text-xs h-[20px] w-[20px] flex items-center justify-center">
              {total < 10 ? total : '9+'}
            </div>
          )}
        </MenuButton>
      }
      transition
    >
      <div className="w-[350px] max-h-[75vh] overflow-auto px-2" id={'scroll-notification'}>
        <h3 className="m-0 px-[10px] text-info">Thông báo</h3>
        {notifications.length > 0 ? (
          <InfiniteScroll
            dataLength={notifications}
            next={getMoreNotification}
            hasMore={hasMore}
            endMessage={
              <div className="text-sm font-normal text-center">Đã tải hết thông báo.</div>
            }
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
    </Menu>
  )
}
