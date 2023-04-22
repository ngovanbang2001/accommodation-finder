import ButtonPrimary from '@/components/button/ButtonPrimary'
import ButtonError from '@/components/button/ButtonError'
import CharacteristicsItem from '@/components/characteristics/CharacteristicsItem'
import TitleSection from '@/components/common/TitleSection'
import { categoryTitleConfig, districtsConfig, provincesConfig, wardsConfig } from 'configs/configs'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { formatPrice, generateSpecificAdress } from 'utils/common'
import { formatDate } from 'utils/moment'
import { PostAPI } from 'apis/post'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Gallery from '@/components/post/Gallery'
import ModalRejectPost from '@/components/modal/ModalRejectPost'
import ModalExpandPost from '@/components/modal/ModalExpandPost'
import CharacteristicsApartment from '@/components/characteristics/CharacteristicsApartment'
import CharacteristicsHouse from '@/components/characteristics/CharacteristicsHouse'
import CharacteristicsOffice from '@/components/characteristics/CharacteristicsOffice'
import CharacteristicsMotel from '@/components/characteristics/CharacteristicsMotel'
import PostTag from '@/components/post/PostTag'

export async function getServerSideProps({ params }) {
  let post = {}
  try {
    const id = params.slug.split('-').slice(-1)
    post = await PostAPI.getPost(id)
  } catch (e) {
    console.log(e)
    post = e
  }
  return {
    props: {
      post,
    },
  }
}
const PreviewPost = ({ post }) => {
  const router = useRouter()
  const profile = useSelector((state) => state.auth.profile)

  const updateStatusPost = async ({ status, isActive, reasonReject }) => {
    let data = { status, isActive }
    if (reasonReject) {
      data.reasonReject = reasonReject
    }
    try {
      const res = await PostAPI.approvePost(post.id, data)
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
        if (profile.role > 0) {
          router.replace(`/managements/post`)
        } else {
          router.replace(`/management/post`)
        }
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
    } catch (e) {
      console.log(e)
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
  }
  const approvePost = () => {
    updateStatusPost({ status: 1, isActive: post.isActive })
  }

  const handleShowModalReject = async (data) => {
    const modal = document.getElementById('modal-reject-post')
    if (modal) {
      modal.click()
    }
  }

  const rejectPost = (data) => {
    updateStatusPost({
      status: 2,
      isActive: post.isActive,
      reasonReject: data,
    })
  }

  const hidePost = async () => {
    updateStatusPost({ isActive: 0 })
  }

  const handleExpandPost = () => {}

  const showModalExpandPost = () => {
    const modal = document.getElementById('modal-expand-post-id')
    if (modal) {
      modal.click()
    }
  }

  return (
    <div className={'bg-base-100'}>
      {post && (
        <div className="max-w-[800px] mx-auto py-8 padding-mobile">
          {post?.images?.length > 0 && (
            <div className="col-span-2 relative">
              <Gallery images={post.images} video={post.video} />
              <PostTag
                tag={categoryTitleConfig[post.category]}
                category={post.category}
                classCustom={'min-w-[100px] text-center'}
              />
            </div>
          )}
          <div>
            <div>
              <div className={'pt-3'}>
                <h2 className="my-1 text-info lg:text-2xl text-xl">{post.title}</h2>
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
                {post.price && (
                  <div className="text-2xl font-bold text-primary pt-3">
                    <span>{formatPrice(post.price)}</span>/tháng
                  </div>
                )}
              </div>

              <div className={''}>
                <div className="flex justify-between items-center py-2">
                  <CharacteristicsItem icon={'fa-regular fa-clock'}>
                    <span className={'text-sm'}>{formatDate(post.createdAt)}</span>
                  </CharacteristicsItem>
                </div>
                <div className="pt-2">
                  <TitleSection title="Đặc điểm bất động sản" />
                  {post.category === 1 && <CharacteristicsApartment post={post} />}

                  {post.category === 2 && <CharacteristicsHouse post={post} />}
                  {post.category === 3 && <CharacteristicsOffice post={post} />}

                  {post.category === 4 && <CharacteristicsMotel post={post} />}
                </div>

                <div className="pt-6">
                  <TitleSection title="Mô tả chi tiết" />
                  <div className="leading-8 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                  </div>
                </div>

                <div className="pt-6">
                  <TitleSection title="Thông tin chủ tin đăng" />
                  <div className="lg:flex items-center justify-center lg:space-x-5 space-y-3 lg:space-y-0">
                    <div className="box-shadow rounded-xl flex flex-col items-center justify-center lg:p-4 p-2 w-full bg-base-100">
                      <CharacteristicsItem icon={'faUserCircle'}>
                        <span>Người đăng bài</span>
                      </CharacteristicsItem>
                      <span className="font-bold pt-2">{post.user.displayName}</span>
                    </div>
                    <div className="box-shadow rounded-xl flex flex-col items-center justify-center lg:p-4 p-2 w-full bg-base-100">
                      <CharacteristicsItem icon={'faUserCircle'}>
                        <span>Điện thoại</span>
                      </CharacteristicsItem>
                      <span className="font-bold pt-2"> {post.user.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tư cách quản trị */}
          {profile.role >= 1 ? (
            <Fragment>
              {post.status === 0 && (
                <div className="flex items-center space-x-2 py-8">
                  <ButtonError
                    title="Từ chối"
                    isPrimary={false}
                    className={'w-full'}
                    handleClick={handleShowModalReject}
                  />
                  <ButtonPrimary
                    title="Phê duyệt"
                    className="w-full"
                    type="submit"
                    handleClick={approvePost}
                  />
                </div>
              )}

              {post.isActive === 1 && post.status === 1 && (
                <div className="pt-8">
                  <ButtonPrimary
                    title="Ẩn tin đăng"
                    className="w-full"
                    type="submit"
                    handleClick={hidePost}
                  />
                </div>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {post.status === 0 && post.isActive === 1 && (
                <div className="py-8">
                  <ButtonPrimary
                    title="Hủy bỏ yêu cầu"
                    className="w-full"
                    type="submit"
                    handleClick={hidePost}
                  />
                </div>
              )}

              {post.isActive === 1 && post.status === 1 && (
                <div className="pt-8">
                  <ButtonPrimary
                    title="Ẩn tin đăng"
                    className="w-full"
                    type="submit"
                    handleClick={hidePost}
                  />
                </div>
              )}

              {post.isActive === 1 && post.status === 3 && (
                <div className="pt-8">
                  <ButtonPrimary
                    title="Gia hạn tin đăng"
                    className="w-full"
                    type="submit"
                    handleClick={showModalExpandPost}
                  />
                </div>
              )}
            </Fragment>
          )}

          <ModalRejectPost id={'modal-reject-post'} rejectPost={rejectPost} />
          <ModalExpandPost
            id={'modal-expand-post-id'}
            handleClick={handleExpandPost}
            typeId={post.type}
            title={post.title}
            postId={post.id}
          />
        </div>
      )}
    </div>
  )
}

export default PreviewPost
