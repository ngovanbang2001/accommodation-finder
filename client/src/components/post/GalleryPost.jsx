import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import Lightbox from 'yet-another-react-lightbox'
import Image from 'next/image'
export default function GalleryPost({ images: imagesProps, video = '' }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [openLightBox, setOpenLightBox] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const handleClick = (index) => {
    setOpenLightBox(true)
    setPhotoIndex(index)
  }
  return (
    <div>
      <>
        <Swiper
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {video && (
            <SwiperSlide>
              <video height={'100%'} width={'100%'} src={video} controls></video>
            </SwiperSlide>
          )}
          {imagesProps.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full relative cursor-zoom-in">
                <Image
                  src={item}
                  layout={'fill'}
                  onClick={() => handleClick(index)}
                  alt={'image'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {imagesProps.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full cursor-zoom-in">
                <Image
                  src={item}
                  layout={'fill'}
                  className={'object-cover'}
                  onClick={() => handleClick(index)}
                  alt={'image'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
      {openLightBox && (
        <Lightbox
          mainSrc={imagesProps[photoIndex]}
          nextSrc={imagesProps[(photoIndex + 1) % imagesProps.length]}
          prevSrc={imagesProps[(photoIndex + imagesProps.length - 1) % imagesProps.length]}
          onCloseRequest={() => setOpenLightBox(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + imagesProps.length - 1) % imagesProps.length)
          }
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % imagesProps.length)}
        />
      )}
    </div>
  )
}
