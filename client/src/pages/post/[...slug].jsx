import React, { Fragment, useEffect, useState } from 'react'
import CharacteristicsItem from '@/components/characteristics/CharacteristicsItem'
import UserInfoContainer from '@/components/user/UserInfoContainer'
import TitleSection from '@/components/common/TitleSection'
import InteractiveContainer from '../../components/interactive/InteractiveContainer'
import { PostAPI } from 'apis/post'
import { formatPrice, generateSpecificAdress } from 'utils/common'
import { formatDate } from 'utils/moment'
import { categoryTitleConfig, districtsConfig, provincesConfig, wardsConfig } from 'configs/configs'
import Gallery from '@/components/post/Gallery'
import { useRouter } from 'next/router'
import CharacteristicsApartment from '@/components/characteristics/CharacteristicsApartment'
import CharacteristicsHouse from '@/components/characteristics/CharacteristicsHouse'
import { useDispatch, useSelector } from 'react-redux'
import ModalShare from '@/components/modal/ModalShare'
import { updateFavoritePosts } from 'store/post/post-slice'
import { toast } from 'react-toastify'
import CharacteristicsMotel from '@/components/characteristics/CharacteristicsMotel'
import CharacteristicsOffice from '@/components/characteristics/CharacteristicsOffice'
import PostTag from '@/components/post/PostTag'
import HomePostItem from '@/components/post/HomePostItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'

export async function getServerSideProps({ params }) {
  let post = {}
  try {
    const id = params.slug[0].split('-').slice(-1)
    post = await PostAPI.getPost(id)
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      post,
    },
  }
}
export default function PostDetail({ post }) {
  const profile = useSelector((state) => state.auth.profile)
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(null)
  const favoritePosts = useSelector((state) => state.post.favoritePosts)
  const [relatedPosts, setRelatedPosts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (favoritePosts && post.id) {
      const p = favoritePosts.find((i) => i.post.id === post.id)
      if (p) {
        setIsFavorite(true)
      }
    }
  }, [favoritePosts])

  useEffect(() => {
    ;(async () => {
      try {
        if (post.id) {
          const { province, district, ward, category, tradingForm } = post
          const res = await PostAPI.getRelatedPost({
            id: post.id,
            data: { province, district, category, tradingForm },
          })
          if (res) {
            setRelatedPosts(res.relatedPosts)
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])
  const handleFilterProvince = () => {
    router.push(`/filter?address=${post.province}`)
  }

  const handleFilterDistrict = () => {
    router.push(`/filter?address=${post.province},${post.district}`)
  }

  const handleFilterWard = () => {
    router.push(`/filter?address=${post.province},${post.district},${post.ward}`)
  }

  const handleFilterCategory = () => {
    router.push(`/filter?category=${post.category}`)
  }

  const handleReport = () => {
    if (profile.id) {
      const modal = document.getElementById('modal-report-post-id')
      if (modal) {
        modal.click()
      }
    } else {
      const modal = document.getElementById('modal-require-login-id')
      if (modal) {
        modal.click()
      }
    }
  }

  const handleShare = () => {
    const modal = document.getElementById('modal-share-id')
    if (modal) {
      modal.click()
    }
  }

  const handleFavorite = async () => {
    if (profile.id) {
      const res = await PostAPI.toggleFavorite({
        userId: profile.id,
        postId: post.id,
      })
      setIsFavorite(!isFavorite)
      if (isFavorite) {
        const array = favoritePosts.filter((i) => i.post.id !== post.id)
        dispatch(updateFavoritePosts(array))
      } else {
        let temp = [...favoritePosts]
        temp.push({ post: post, userFavorite: profile })
        dispatch(updateFavoritePosts(temp))
      }
      if (res.ok) {
        toast.success('Cập nhật thông tin thành công!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      } else {
        toast.error('Đã có lỗi xảy ra!', {
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
    } else {
      const modal = document.getElementById('modal-require-login')
      if (modal) {
        modal.click()
      }
    }
  }
  return (
    <Fragment>
      {post.id ? (
        <div className={'bg-base-100'}>
          <div className="container mx-auto py-8 padding-mobile">
            <div className="text-sm breadcrumbs pb-4">
              <ul>
                <li className="cursor-pointer" onClick={handleFilterCategory}>
                  {categoryTitleConfig[post.category]}
                </li>
                <li onClick={handleFilterProvince} className="cursor-pointer">
                  {provincesConfig[post.province]}
                </li>
                <li className="cursor-pointer" onClick={handleFilterDistrict}>
                  {districtsConfig[post.district]}
                </li>
                <li className="cursor-pointer" onClick={handleFilterWard}>
                  {wardsConfig[post.ward]}
                </li>
              </ul>
            </div>
            <div className="lg:grid grid-cols-3 lg:space-x-5">
              <div className="col-span-2 relative">
                <Gallery images={post.images} video={post.video} />
                <PostTag
                  tag={categoryTitleConfig[post.category]}
                  category={post.category}
                  classCustom={'min-w-[100px] text-center'}
                />
              </div>
              <div className="hidden col-span-1 lg:flex flex-col gap-y-5">
                <UserInfoContainer
                  user={post.user}
                  userId={post.userId}
                  tradingForm={post.tradingForm}
                />
              </div>
            </div>
            <div>
              <div className="pt-4">
                {post.tradingForm < 3 ? (
                  <div>
                    <div className={''}>
                      <h2 className="py-2 m-0 text-info lg:text-2xl text-xl">{post.title}</h2>
                      <div className="flex items-center space-x-2">
                        <i className="fa-light fa-location-dot"></i>
                        <span>
                          {generateSpecificAdress(
                            post.houseNumber,
                            post.lane,
                            post.street,
                            wardsConfig[post.ward],
                            districtsConfig[post.district],
                            provincesConfig[post.province]
                          )}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary pt-3">
                        <span>{formatPrice(post.price)}</span>/tháng
                      </div>
                    </div>

                    <div className={''}>
                      <div className="flex justify-between items-center py-2">
                        <CharacteristicsItem icon={'fa-regular fa-clock'}>
                          <span className={'text-sm'}>{formatDate(post.updatedAt)}</span>
                        </CharacteristicsItem>
                        <div className="flex items-center gap-x-5">
                          <div className="cursor-pointer" onClick={handleShare}>
                            <CharacteristicsItem icon={'fa-solid fa-share'}>
                              <span className={'text-sm'}>Chia sẻ</span>
                            </CharacteristicsItem>
                          </div>
                          <div className="cursor-pointer" onClick={handleFavorite}>
                            <CharacteristicsItem
                              icon={`${
                                isFavorite
                                  ? 'fa-solid fa-heart text-[#f9595f]'
                                  : 'fa-regular fa-heart'
                              }`}
                            >
                              <span className={'text-sm'}>Yêu thích</span>
                            </CharacteristicsItem>
                          </div>
                          <div className="cursor-pointer" onClick={handleReport}>
                            <CharacteristicsItem icon={'fa-regular fa-flag'}>
                              <span className={'text-sm'}>Báo cáo</span>
                            </CharacteristicsItem>
                          </div>
                        </div>
                      </div>
                      {post.tradingForm !== 3 && (
                        <div className="pt-2">
                          <TitleSection title="Đặc điểm bất động sản" />
                          {post.category === 1 && <CharacteristicsApartment post={post} />}

                          {post.category === 2 && <CharacteristicsHouse post={post} />}
                          {post.category === 3 && <CharacteristicsOffice post={post} />}

                          {post.category === 4 && <CharacteristicsMotel post={post} />}
                        </div>
                      )}

                      <div className="pt-6">
                        <TitleSection title="Mô tả chi tiết" />
                        <div className="leading-8 text-justify">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-6">
                    <TitleSection title="Yêu cầu chi tiết" />
                    <div className="leading-8 text-justify">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.description,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="py-4">
              <TitleSection title="Xem thêm các tin đăng tương tự" />
              <div className="flex items-center gap-x-5 py-4">
                {relatedPosts.length ? (
                  <Fragment>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={10}
                      modules={[Navigation, Autoplay]}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 5,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {relatedPosts.length > 0 &&
                        relatedPosts.map((item) => (
                          <SwiperSlide key={item.id}>
                            <HomePostItem item={item} key={item.id} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </Fragment>
                ) : (
                  <div className="text-center w-full">Không có tin đăng tương tự nào.</div>
                )}
              </div>
            </div>
            <InteractiveContainer postId={post.id} />
          </div>
          <ModalShare id={'modal-share-post'} title={post.title} />
        </div>
      ) : null}
    </Fragment>
  )
}
