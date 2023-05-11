import { userAPI } from 'apis/user'
import { activeAccountConfig, LIMIT } from 'configs/configs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatPrice } from 'utils/common'
import { formatDate } from 'utils/moment'
import ButtonPrimary from '../button/ButtonPrimary'
import Paginate from '../common/Paginate'
import Avatar from '../user/Avatar'

const AccountTable = ({
  accounts: accountsProp,
  pageActive,
  pageCount,
  handleTabNewClick,
  total,
  hideCol = false,
}) => {
  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    if (accountsProp) {
      const data = accountsProp.filter((account) => account.role !== 2)
      setAccounts(data)
    }
  }, [accountsProp])
  const renderClass = (isActive) => {
    switch (isActive) {
      case 1: {
        return 'bg-green-100 text-green-500 text-sm'
      }
      case 0: {
        return 'bg-red-100 text-red-500 text-sm'
      }
    }
  }

  const handleLockAccount = async (item) => {
    try {
      const res = await userAPI.lockAccount({
        id: item.id,
        data: { isActive: item.isActive ? 0 : 1 },
      })
      if (res.ok) {
        const arrayTemp = [...accounts]
        for (const i in accounts) {
          if (arrayTemp[i].id == item.id) {
            arrayTemp[i].isActive = item.isActive ? 0 : 1
            break
          }
        }
        setAccounts([...arrayTemp])
        toast.success(
          `${!item.isActive ? 'Khóa tài khoản thành công!' : 'Mở khóa tài khoản thành công!'}`,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          }
        )
      } else {
        toast.error('Cập nhật thông tin thất bại!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    } catch (e) {
      console.log(e)
      toast.error('Cập nhật thông tin thất bại!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
  }

  return (
    <div>
      {accounts.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <div className="flex items-center justify-between">
            <div className="pb-2">
              Tất cả có <span className="font-bold">{accounts?.length}</span> tài khoản
            </div>
          </div>
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>STT</th>
                <th>Ảnh đại diện</th>
                <th>Tên hiển thị</th>
                {hideCol ? <th>Username</th> : <th>Nguồn tài khoản</th>}
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Số dư tài khoản</th>
                <th>Ngày tham gia</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {accounts?.length > 0 &&
                accounts.map((item, index) => (
                  <tr key={item.id} className={'text-center text-sm'}>
                    <td className="text-center">{index + 1}</td>
                    <td className="flex justify-center">
                      <Avatar avatar={item.avatar} sizeAvatar={'w-12'} />
                    </td>
                    <td className="!text-start overflow-hidden whitespace-nowrap text-ellipsis max-w-[300px] text-sm font-bold">
                      {item.displayName}
                    </td>

                    {hideCol ? (
                      <td className="text-center font-bold">{item.username}</td>
                    ) : (
                      <td className="text-center">{item.from}</td>
                    )}
                    <td className="text-center">{item.phoneNumber}</td>
                    <td className="!text-start">{item.email}</td>
                    <td className="text-center">
                      {formatPrice(item.balance)} <span>&#8363;</span>
                    </td>
                    <td className="">{formatDate(item.createdAt)}</td>
                    <td className="text-center">
                      <span className={`${renderClass(item.isActive)} p-2 rounded-lg`}>
                        {activeAccountConfig[item.isActive]}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center space-x-2">
                        {item.isActive ? (
                          <div
                            className="bg-red-500 p-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer w-[80px]"
                            onClick={() => handleLockAccount(item)}
                          >
                            <i className="fa-regular fa-lock"></i>
                            <span>Khóa</span>
                          </div>
                        ) : (
                          ''
                        )}
                        {!item.isActive ? (
                          <div
                            className="bg-green-500 p-2 text-sm rounded-md text-white space-x-1 flex justify-center items-center cursor-pointer w-[80px]"
                            onClick={() => handleLockAccount(item)}
                          >
                            <i className="fa-regular fa-lock-open"></i>
                            <span>Mở khóa</span>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {total > LIMIT && (
            <Paginate
              handleTabNewClick={handleTabNewClick}
              pageActive={pageActive}
              pageCount={pageCount}
            />
          )}
        </div>
      ) : (
        <div className="py-8 text-center">Không có tài khoản nào.</div>
      )}
    </div>
  )
}

export default AccountTable
