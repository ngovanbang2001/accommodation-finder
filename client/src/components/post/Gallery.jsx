import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import Lightbox from 'yet-another-react-lightbox'
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from 'video-react'
import Image from 'next/image'
//library fullsceen image
import FsLightbox from 'fslightbox-react'
export default function Gallery({ images: imagesProps, video = '' }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1, //default
  })
  const videoRef = useRef(null)
  const [sources, setSources] = useState(null)
  const [thumbs, setThumbs] = useState(null)
  const [videoSrc, setVideoSrc] = useState(null)
  const handleClick = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index + 1,
    })
  }

  useEffect(() => {
    if (video) {
      setSources([video, ...imagesProps])
      setThumbs([
        'https://res.cloudinary.com/dqrn1uojt/image/upload/v1675053651/thumbnail-video_uaotue.png',
        ...imagesProps,
      ])
    } else {
      setSources([...imagesProps])
      setThumbs([...imagesProps])
    }
  }, [imagesProps, video])

  useEffect(() => {
    setVideoSrc(video)
    if (videoRef && videoRef.current) {
      videoRef.current.video.load()
    }
    return () => {
      setVideoSrc(null)
    }
  }, [video])
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
          className="mySwiper2 custom-swiper-detail-post"
        >
          {video && (
            <SwiperSlide>
              <div className="flex items-center justify-center h-[450px]    ">
                <Player
                  ref={videoRef}
                  playsInline
                  poster="https://res.cloudinary.com/dqrn1uojt/image/upload/v1675062159/thumbnail-video-no-button_qf1rax.png"
                  src={videoSrc}
                  className={'w-full h-[450px]'}
                >
                  <LoadingSpinner />
                  <ControlBar autoHide={false} className="my-class" />
                  <BigPlayButton position="center" />
                </Player>
              </div>
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
        {thumbs && (
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {thumbs.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full cursor-zoom-in">
                  <Image
                    src={item}
                    layout={'fill'}
                    blurDataURL={item}
                    placeholder={'blur'}
                    className={'object-cover'}
                    onClick={() => handleClick(index)}
                    alt={'image'}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={sources}
        slide={lightboxController.slide}
      />
    </div>
  )
}
