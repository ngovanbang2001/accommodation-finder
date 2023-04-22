import * as React from 'react'
import ButtonPrimary from '../button/ButtonPrimary'
import ButtonSecondary from '../button/ButtonSecondary'
import Avatar from '../user/Avatar'
export default function RealEstateExpertsItem(props) {
  return (
    <div className=" my-8 w-full box-shadow rounded-md overflow-hidden bg-base-100">
      <div className="relative">
        <div className="bg-backgroundPrimary h-[200px]"></div>
        <Avatar sizeAvatar="w-28" className="absolute -bottom-8 left-1/2 -translate-x-1/2" />
      </div>
      <div className="flex items-center flex-col justify-center gap-y-4 mt-10 p-4 pt-0">
        <span className="font-bold text-info">Ngô Văn Bằng </span>
        <div className="flex items-center justify-center gap-x-10">
          <div className="flex flex-col items-center text-info">
            <span className="font-bold">10</span>
            <span className="text-sm">Tin đăng</span>
          </div>
          <div className="flex flex-col items-center text-info">
            <span className="font-bold">90</span>
            <span className="text-sm">Người theo dõi</span>
          </div>
          <div className="flex flex-col items-center text-info">
            <span className="font-bold">4.5/5</span>
            <span className="text-sm">Đánh giá</span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 w-full justify-center">
          <ButtonSecondary iconName={'fa-solid fa-rss'} title={'Theo dõi'} />
          <ButtonSecondary
            isPrimary={false}
            iconName={'fa-regular fa-comment'}
            title={'Nhắn tin'}
            className={'w-fit'}
          />
        </div>
        <ButtonPrimary title="Xem trang cá nhân" className="w-full" />
      </div>
    </div>
  )
}
