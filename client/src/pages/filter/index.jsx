import FeatureSection from '@/components/home/FeatureSection'
import HomePostItem from '@/components/post/HomePostItem'
import { PostAPI } from 'apis/post'
import {
  districtsConfig,
  tradingFormConfig,
  provincesConfig,
  categoryConfig,
  wardsConfig,
  furnitueConfig,
  hasVideoConfig,
} from 'configs/configs'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import ButtonSeeMore from '@/components/button/ButtonSeeMore'
import PostSekeleton from '@/components/Sekeleton/PostSekeleton'
import { formatPrice } from 'utils/common'

const FilterPage = () => {
  const router = useRouter()
  const [criteriaFilter, setCriteriaFilter] = useState([])
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(null)
  const [showButtonLoadMore, setShowButtonLoadMore] = useState(null)
  const [limit, setLimit] = useState(6)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)

  const getPosts = async (offsetProp) => {
    try {
      setLoading(true)
      const res = await PostAPI.filterPost({
        ...router.query,
        offset: offsetProp,
        limit,
        status: 1,
        isActive: 1,
      })
      if (res) {
        if (offsetProp === 0) {
          setTotal(res.total)
          setPosts([...res.posts])
        } else {
          setPosts((posts) => [...posts, ...res.posts])
        }
      } else {
        setPosts([])
        setTotal(0)
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (Object.keys(router.query).length) {
        let categoryValue = []
        let priceRangeValue = {}
        let areaRangeValue = {}
        let addressValue = {}
        let tradingFormValue = ''
        let furnitureValue = ''
        let hasVideoValue = ''
        if (Object.keys(router.query).length) {
          const {
            category,
            priceRange,
            areaRange,
            address,
            tradingForm,
            keyword,
            isFurniture,
            hasVideo,
          } = router.query
          if (category) {
            category.split(',').forEach((item) => {
              categoryValue.push(categoryConfig.find((i) => i.id === +item))
            })
          }

          if (priceRange) {
            const priceRangeArray = priceRange.split(',')
            priceRangeValue = {
              title: `Khoảng giá ${formatPrice(priceRangeArray[0])}đ - ${formatPrice(
                priceRangeArray[1]
              )}đ`,
            }
          }

          if (areaRange) {
            const areaRangeArray = areaRange.split(',')
            areaRangeValue = {
              title: `Diện tích ${areaRangeArray[0]}m2 - ${areaRangeArray[1]}m2`,
            }
          }
          if (address) {
            const addressArray = address.split(',')
            addressValue = {
              title: `Vị trí ${provincesConfig[addressArray[0]]}${
                addressArray[1]
                  ? ', ' +
                    `${districtsConfig[addressArray[1]]}${
                      addressArray[2] ? ', ' + wardsConfig[addressArray[2]] : ''
                    }`
                  : ''
              }`,
            }
          }

          if (tradingForm) {
            if (tradingForm == tradingFormConfig['BUY_SELL']) {
              tradingFormValue = {
                title: `Hình thức Bán`,
              }
            } else if (tradingForm == tradingFormConfig['FOR_RENTAL']) {
              tradingFormValue = {
                title: `Hình thức Cho thuê`,
              }
            } else if (tradingForm == tradingFormConfig['ROOM_MATE']) {
              tradingFormValue = {
                title: `Hình thức Tìm bạn ở ghép`,
              }
            } else {
              tradingFormValue = {
                title: `Hình thức Cần thuê`,
              }
            }
          }
          if (router.query.isFurniture) {
            if (+isFurniture == furnitueConfig['NONE']) {
              furnitureValue = {
                title: `Không có nội thất`,
              }
            } else if (+router.query.isFurnitue == furnitueConfig['BASIC']) {
              furnitureValue = {
                title: `Nội thất cơ bản`,
              }
            } else {
              furnitureValue = {
                title: `Nội thất đầy đủ`,
              }
            }
          }

          if (hasVideo) {
            if (+hasVideo == hasVideoConfig['NONE']) {
              hasVideoValue = {
                title: `Tin không video`,
              }
            } else if (+hasVideo == hasVideoConfig['HAS_VIDEO']) {
              hasVideoValue = {
                title: `Tin có video`,
              }
            } else {
              hasVideoValue = {
                title: `Tin có hoặc không có video`,
              }
            }
          }
        }
        setCriteriaFilter([
          tradingFormValue,
          ...categoryValue,
          addressValue,
          priceRangeValue,
          areaRangeValue,
          furnitureValue,
          hasVideoValue,
        ])

        getPosts(0)
      }
    })()
  }, [router.query])

  useEffect(() => {
    if (total && total > 0 && posts.length < total) {
      setShowButtonLoadMore(true)
    } else {
      setShowButtonLoadMore(false)
    }
  }, [posts.length])

  const handleLoadMore = () => {
    setLoadMore(true)
    getPosts(offset + limit)
    setOffset(offset + limit)
    setLoadMore(false)
  }
  const handleDeleteFilterLabel = (item) => {
    let { category } = router.query

    if (item.title.includes('Khoảng giá')) {
      delete router.query.priceRange
    } else if (item.title.includes('Diện tích')) {
      delete router.query.areaRange
    } else if (item.title.includes('Vị trí')) {
      delete router.query.address
    } else if (item.title.includes('Nội thất')) {
      delete router.query.isFurniture
    } else if (item.title.includes('video')) {
      delete router.query.hasVideo
    } else if (item.title.includes('Hình thức')) {
      delete router.query.tradingForm
    } else if (category.includes(item.id)) {
      const categoryTemp = category
        .split(',')
        .filter((i) => i !== item.id.toString())
        .join(',')

      if (categoryTemp.length) {
        router.query.category = categoryTemp
      } else {
        delete router.query.category
      }
    }
    if (!Object.keys(router.query).length) {
      router.push('/')
    } else {
      let queryTemp = []
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`)
      }
      router.push(`/filter?${queryTemp.join('&')}`)
    }
  }
  return (
    <div>
      <div className="container mx-auto">
        <FeatureSection />
      </div>
      <div className="container mx-auto px-2">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <span
            className="font-bold text-secondary underline underline-offset-4 shrink-0 cursor-pointer"
            onClick={() => {
              router.push('/')
            }}
          >
            Xóa tất cả
          </span>
          {criteriaFilter.map((item, index) => (
            <Fragment key={index}>
              {item.title && (
                <div className={'shrink-0'}>
                  {item.title && (
                    <div className="px-2 py-1.5 bg-blue-100 text-primary font-semibold rounded-lg flex items-center space-x-2">
                      <span>{item.title}</span>
                      <i
                        className="fa-regular fa-circle-xmark cursor-pointer"
                        onClick={() => handleDeleteFilterLabel(item)}
                      ></i>
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
        {posts.length > 0 ? (
          <Fragment>
            <div className="pt-3 flex items-center justify-between">
              {loading ? (
                <div className={'animate-pulse h-6 bg-slate-200 rounded-lg my-2 w-[250px]'}></div>
              ) : (
                <span>
                  <span className="font-bold">{posts.length} tin đăng</span> đang hiển thị
                </span>
              )}
            </div>
            <div className="my-4 grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-1.5 md:gap-5">
              {loading ? (
                <Fragment>
                  <PostSekeleton></PostSekeleton>
                  <PostSekeleton></PostSekeleton>
                  <PostSekeleton></PostSekeleton>
                </Fragment>
              ) : (
                <Fragment>
                  {posts.map((post) => (
                    <HomePostItem key={post.id} item={post} />
                  ))}

                  {loadMore && (
                    <Fragment>
                      <PostSekeleton></PostSekeleton>
                      <PostSekeleton></PostSekeleton>
                      <PostSekeleton></PostSekeleton>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
            <div className="text-center pb-4">
              {!loading && (
                <span className="font-semibold text-gray-500">
                  Đang hiển thị {posts.length} / {total} bài viết.
                </span>
              )}
            </div>
            {showButtonLoadMore && (
              <div className="flex justify-center pb-8">
                <ButtonSeeMore handleClick={handleLoadMore} />
              </div>
            )}
          </Fragment>
        ) : (
          <div className="p-16 text-center font-bold">Không có tin đăng phù hợp.</div>
        )}
      </div>
    </div>
  )
}

export default FilterPage
