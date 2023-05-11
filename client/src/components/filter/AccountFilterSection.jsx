import { useRouter } from 'next/router'
import React from 'react'
const AccountFilterSection = ({ setKeyword, keyword, handleSearch }) => {
  const router = useRouter()
  const handleSearchPost = (e) => {
    e.preventDefault()
    handleSearch()
  }

  const handleShowModal = () => {
    const modal = document.getElementById('modal-create-account')
    if (modal) {
      modal.click()
    }
  }

  return (
    <div className="py-4">
      <div className="justify-end flex md:flex-row flex-col md:items-center md:space-x-3 md:space-y-0 space-y-3">
        <form onSubmit={(e) => handleSearchPost(e)}>
          <div className="relative w-[300px]">
            <i className="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-2/4 left-3 z-10 text-gray-400 text-sm"></i>
            <input
              placeholder="Tìm kiếm tên người dùng"
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
              value={keyword}
              className="w-full py-2.5 pl-[30px] pr-3 rounded-lg outline-none focus:border-2 focus:border-primary border border-gray-200 bg-base-100"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountFilterSection
