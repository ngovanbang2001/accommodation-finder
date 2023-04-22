import React, { Fragment, useEffect, useState } from 'react'
import NewCategorySection from '@/components/blog/NewCategorySection'
import { NewAPI } from 'apis/new'
import NewHomeItem from '@/components/home/news/NewHomeItem'
import { NewCategoryAPI } from 'apis/new-category'
import { strToSlug } from 'utils/common'
import { useRouter } from 'next/router'
const PostByCategory = () => {
  const [newsByCategory, setNewsByCategory] = useState([])
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const [category, setCategory] = useState(null)
  const [showLoadMore, setShowLoadMore] = useState(null)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const [categoryId, setCategoryId] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        const categoriesRes = await NewCategoryAPI.getAllCategories({
          offset: 0,
          limit,
        })
        if (categoriesRes.categories) {
          setCategories(categoriesRes.categories)
          const cate = categoriesRes.categories.find((item) => (item.id = +id))
          if (cate) {
            setCategory(cate)
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const getNews = async ({ cateId, offset }) => {
    try {
      const res = await NewAPI.getNews({
        isActive: 1,
        offset,
        limit,
        categoryId: +cateId,
      })
      if (res.news) {
        setNewsByCategory((news) => [...news, ...res.news])
        setOffset(offset + limit)
        if (res.news.length + newsByCategory.length < res.total) {
          setShowLoadMore(true)
        } else {
          setShowLoadMore(false)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (router.asPath) {
        const id = router.asPath.split('-').slice(-1)
        setCategoryId(id)
        getNews({ cateId: id, offset: 0 })
      }
    })()
  }, [router.asPath])

  const handleClickCategory = (item) => {
    const slug = strToSlug(item.name)
    router.replace(`/blog/${slug}-${item.id}`)
  }

  const handleLoadMore = () => {
    getNews({ cateId: categoryId, offset })
  }
  return (
    <div>
      <div className="lg:block hidden">
        <NewCategorySection categories={categories} />
      </div>
      <div className="container mx-auto px-4">
        <div>
          <div className="md:grid grid-cols-3 md:space-x-8 my-8">
            <div className="col-span-2">
              <div className="font-bold text-3xl mb-2">{category?.name}</div>
              {newsByCategory?.length > 0 &&
                newsByCategory.map((item, index) => <NewHomeItem key={index} item={item} />)}
              {showLoadMore && (
                <div className="flex justify-center pb-4">
                  <div
                    className=" btn bg-primary w-[200px] text-white normal-case hover:bg-primary hover:outline-none hover:border-primary outline-none"
                    onClick={handleLoadMore}
                  >
                    Xem thêm
                  </div>
                </div>
              )}
              <div></div>
            </div>
            <div>
              <div>
                <div className="font-bold text-xl">Danh mục tin tức</div>
                <div className="h-[2px] bg-gray-100 mt-1.5 relative">
                  <div className="h-1 bg-primary absolute -top-1 left-0 w-[80px]"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2.5 my-2.5">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className={'space-x-2 cursor-pointer'}
                    onClick={() => handleClickCategory(item)}
                  >
                    <i className="fa-regular fa-chevron-right text-xs"></i>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostByCategory
