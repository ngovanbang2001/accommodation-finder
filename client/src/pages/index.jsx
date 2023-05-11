import { Fragment, useEffect } from 'react'
import ha_noi from '@/assets/images/area-motel-room/ha_noi.jpg'
import da_nang from '@/assets/images/area-motel-room/da_nang.jpg'
import tp_hcm from '@/assets/images/area-motel-room/tp_hcm.webp'
import FeatureSection from '@/components/home/FeatureSection'
import AreaMotelRoom from '@/components/home/area-motel-room/AreaMotelRoom'
import HomePostList from '@/components/post/HomePostList'
import AboutSection from '@/components/about/AboutSection'
import TitleSection from '@/components/common/TitleSection'
import HorizontalList from '@/components/common/HorizontalList'
import ServiceSection from '@/components/home/services/ServiceSection'
import { useRouter } from 'next/router'
import PostSekeleton from '@/components/Sekeleton/PostSekeleton'

const areaMotelRooms = [
  { id: 1, img: ha_noi, title: 'Hà Nội', postCount: 143, code: 1 },
  { id: 2, img: da_nang, title: 'Đà Nẵng', postCount: 93, code: 48 },
  { id: 3, img: tp_hcm, title: 'TP. Hồ Chí Minh', postCount: 63, code: 79 },
]

export default function Home() {
  const router = useRouter()
  const handleClick = (code) => {
    router.push(`/filter?address=${code}`)
  }
  return (
    <Fragment>
      <div className="mx-auto bg-base-200">
        <FeatureSection />
        <ServiceSection />
        <div>
          <div className="container padding-mobile pb-8">
            <TitleSection title="Tin đăng theo khu vực" />
            <div className="pt-6">
              <HorizontalList>
                {areaMotelRooms.map((item) => (
                  <div key={item.id} onClick={() => handleClick(item.code)}>
                    <AreaMotelRoom item={item} />
                  </div>
                ))}
              </HorizontalList>
            </div>
          </div>
          <div className="container">
            <HomePostList title={'Tin đăng về Căn hộ/Chung cư'} category={1} />
            <HomePostList title={'Tin đăng về nhà ở'} category={2} />
            <HomePostList title={'Tin đăng về Văn phòng/Mặt bằng'} category={3} />
            <HomePostList title={'Tin đăng về Phòng trọ'} category={4} />
          </div>
          <AboutSection />
        </div>
      </div>
    </Fragment>
  )
}
