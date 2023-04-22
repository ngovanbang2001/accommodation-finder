import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import select from '@/assets/images/management/select.png'
import PostNewSectionTutorial from '@/components/post-new/PostNewSectionTutorial'
import PostNewContent from '@/components/post-new/PostNewContent'
import FormGroup from '@/components/common/FormGroup'
import { formatPrice } from 'utils/common'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import MySelect from '@/components/select/Select'
import ButtonPrimary from '@/components/button/ButtonPrimary'
import { PostAPI } from 'apis/post'
import { useDispatch, useSelector } from 'react-redux'
import ButtonSecondary from '@/components/button/ButtonSecondary'
import { useRouter } from 'next/router'
import PostApartermentContent from '@/components/post-new/PostApartermentContent'
import PostHouse from '@/components/post-new/PostHouse'
import PostOffice from '@/components/post-new/PostOffice'
import { PostTypeAPI } from 'apis/post-type'
import PostRental from '@/components/post-new/PostRental'
import { userAPI } from 'apis/user'
import { authUpdateProfile } from 'store/auth/auth-slice'
import { Label } from '@/components/label'

const schema = yup.object({
  postType: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .required('Vui lòng chọn loại tin'),
  time: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .required('Vui lòng chọn thời gian'),
  timeNumber: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .required('Vui lòng chọn khoảng thời gian'),
})
const types = [
  { name: 'Căn hộ/Chung cư', value: 1 },
  { name: 'Nhà ở', value: 2 },
  { name: 'Văn phòng/Mặt bằng kinh doanh', value: 3 },
  { name: 'Phòng trọ', value: 4 },
]
const steps = [
  { name: 'Chọn danh mục' },
  { name: 'Nội dung tin đăng' },
  { name: 'Thanh toán' },
  { name: 'Hoàn thành' },
]
export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(null)
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const [tradingFormText, setTradingFormText] = useState('')
  const [tradingForm, setTradingForm] = useState(null)
  const [tabActive, setTabActive] = useState(0)
  const [category, setCategory] = useState(0)
  const [post, setPost] = useState({})
  const [amount, setAmount] = useState(null)
  const profile = useSelector((state) => state.auth.profile)
  const [pricePostType, setPricePostType] = useState()
  const [selectedPostType, setSelectedPostType] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedTimeNumber, setSelectedTimeNumber] = useState(null)

  const [postTypeOptions, setPostTypeOption] = useState(null)
  const [postTypes, setPostTypes] = useState(null)
  const [timeCount, setTimeCount] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const selectTab = (index) => {
    if (index < tabActive) {
      setTabActive(index)
    }
  }
  const selectCategory = (item) => {
    setTabActive(tabActive + 1)
    setCategory(item.value)
  }
  const watcherPostType = watch('postType')
  const watcherTime = watch('time')
  const watcherTimeNumber = watch('timeNumber')
  const timePackage = [
    {
      label: 'Đăng theo ngày',
      value: 1,
    },
    {
      label: 'Đăng theo tuần',
      value: 2,
    },
    {
      label: 'Đăng theo tháng',
      value: 3,
    },
  ]

  const weekPackage = [
    {
      label: '1 tuần',
      value: 1,
    },
    {
      label: '2 tuần',
      value: 2,
    },
    {
      label: '3 tuần',
      value: 3,
    },
  ]

  const dayPackage = [
    {
      label: '3 ngày',
      value: 3,
    },
    {
      label: '4 ngày',
      value: 4,
    },
    {
      label: '5 ngày',
      value: 5,
    },
    {
      label: '6 ngày',
      value: 6,
    },
    {
      label: '7 ngày',
      value: 7,
    },
  ]

  const monthPackage = [
    {
      label: '1 tháng',
      value: 1,
    },
    {
      label: '2 tháng',
      value: 2,
    },
    {
      label: '3 tháng',
      value: 3,
    },
  ]
  const createPost = async () => {
    if (post) {
      try {
        setIsLoading(true)
        const res = await PostAPI.createPost({
          post: {
            ...post,
            timeNumber: watcherTimeNumber.value,
            type: watcherPostType.value,
            tradingForm,
            kindOfTime: watcherTime.value,
            totalPayment: amount,
          },
          amount,
        })
        setIsLoading(false)
        if (res.post) {
          router.replace('/management/post')
          const profileRes = await userAPI.getProfile()
          dispatch(authUpdateProfile(profileRes))
          toast.success('Đã tạo tin đăng thành công!', {
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
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      const res = await PostTypeAPI.getPostTypes({
        status: 1,
        offset: 0,
        limit: 20,
      })
      if (res) {
        const temp = res.postTypes.map((item) => ({
          value: item.id,
          label: item.title,
        }))
        setPostTypeOption([...temp])
        setPostTypes(res.postTypes)
      }
    })()
  }, [])

  useEffect(() => {
    if (watcherPostType) {
      setSelectedPostType(watcherPostType)
      setSelectedTime(null)
      setSelectedTimeNumber(null)
    }
  }, [watcherPostType])

  useEffect(() => {
    if (watcherTime) {
      setSelectedTime(watcherTime)
      setSelectedTimeNumber(null)
      const postType = postTypes.find((item) => item.id === watcherPostType.value)
      switch (watcherTime.value) {
        case 1: {
          setPricePostType(postType.priceForDay)
          setTimeCount(dayPackage)
          break
        }
        case 2: {
          setPricePostType(postType.priceForWeek)
          setTimeCount(weekPackage)
          break
        }
        case 3: {
          setPricePostType(postType.priceForMonth)
          setTimeCount(monthPackage)
          break
        }
        default: {
          break
        }
      }
    }
  }, [watcherTime])

  useEffect(() => {
    if (watcherTime) {
      setSelectedTimeNumber(watcherTimeNumber)
      setAmount(pricePostType * watcherTimeNumber.value)
    }
  }, [watcherTimeNumber])

  useEffect(() => {
    if (router.asPath?.includes('purcharse-post')) {
      setTradingFormText('Bán')
      setTradingForm(2)
    } else if (router.asPath?.includes('for-rent-post')) {
      setTradingFormText('Cho thuê')
      setTradingForm(1)
    } else if (router.asPath?.includes('rent-post')) {
      setTradingFormText('Cần thuê')
      setTradingForm(3)
    } else if (router.asPath?.includes('looking-roomate-post')) {
      setTradingFormText('Tìm bạn ở ghép')
      setTradingForm(4)
      setTabActive(1)
      setCategory(4)
    }
  }, [router.asPath])

  return (
    <div className="mx-auto w-full container">
      <div className="lg:py-10 py-8">
        <ul className="steps w-full">
          {steps.map((item, index) => (
            <li
              className={`step ${index <= tabActive ? 'step-primary cursor-pointer' : ''}
                }`}
              key={index}
              onClick={() => selectTab(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {tabActive === 0 && (
        <div className="lg:grid grid-cols-12 gap-x-5">
          <div className="col-span-3 px-2">
            <div className="flex items-center gap-x-3 pb-4">
              <div className="w-[25px] h-[25px] rounded-full bg-secondary text-white font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="flex-1 m-0 text-secondary">
                Chọn danh mục đăng tin {tradingFormText}
              </h3>
            </div>
            {tradingForm === 2 ? (
              <ul>
                {types.slice(0, -1).map((item, index) => (
                  <li
                    key={index}
                    className={'py-4 border-t-2 border-base-200 cursor-pointer'}
                    onClick={() => selectCategory(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {types.map((item, index) => (
                  <li
                    key={index}
                    className={'py-4 border-t-2 border-base-200 cursor-pointer'}
                    onClick={() => selectCategory(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-span-9 flex flex-col items-center">
            <div className="relative w-[400px] h-[350px]">
              <Image src={select} alt={'img select category'} layout={'fill'} objectFit={'cover'} />
            </div>
            <div className="lg:w-8/12 w-full lg:px-0 px-2">
              <div className=" bg-red-200 text-center p-4 rounded-md">
                <span className="text-lg">Vui lòng chọn danh mục đăng tin bất động sản.</span>
              </div>
              <p className="py-4 leading-8 text-justify">
                Bạn có nhà trọ phòng trọ, chung cư... cần cho thuê, cần bán? Bây giờ đăng tin quảng
                bá bất động sản dễ dàng hơn bao giờ hết. Trotot.online cung cấp các chức năng đăng
                tin, xem tin bất động sản dễ dàng, nhanh chóng, hiệu quả cao, tiếp cận nhiều khách
                hàng nhất, nhanh nhất.
              </p>
            </div>
          </div>
        </div>
      )}
      {tabActive === 1 && (
        <div className="lg:grid grid-cols-12 gap-x-5">
          <div className="col-span-3 px-2">
            <div className="flex items-center gap-x-3 pb-4">
              <div className="w-[25px] h-[25px] rounded-full bg-secondary text-white font-bold flex items-center justify-center">
                2
              </div>
              <h3 className="m-0 text-info">Nội dung tin đăng</h3>
            </div>
            <PostNewSectionTutorial />
          </div>
          {tradingForm !== 3 ? (
            <div className="col-span-9 flex flex-col items-center lg:px-4 lg:py-0 p-2">
              {category === 1 && (
                <PostApartermentContent
                  category={category}
                  setTabActive={setTabActive}
                  setPost={setPost}
                  tradingForm={tradingForm}
                />
              )}

              {category === 2 && (
                <PostHouse
                  category={category}
                  setTabActive={setTabActive}
                  setPost={setPost}
                  tradingForm={tradingForm}
                />
              )}

              {category === 3 && (
                <PostOffice
                  category={category}
                  setTabActive={setTabActive}
                  setPost={setPost}
                  tradingForm={tradingForm}
                />
              )}

              {category === 4 && (
                <PostNewContent
                  category={category}
                  setTabActive={setTabActive}
                  setPost={setPost}
                  tradingForm={tradingForm}
                />
              )}
            </div>
          ) : (
            <div className="col-span-9 flex flex-col items-center lg:px-4 lg:py-0 p-2">
              <PostRental
                category={category}
                setTabActive={setTabActive}
                setPost={setPost}
                tradingForm={tradingForm}
              />
            </div>
          )}
        </div>
      )}
      {tabActive === 2 && (
        <div className="col-span-2 lg:p-0 p-2">
          <div className="md:flex items-center md:space-x-3">
            <div className="flex-1">
              <FormGroup>
                <Label className="font-bold">Chọn loại tin</Label>
                <MySelect
                  options={postTypeOptions}
                  control={control}
                  error={errors.postType?.message}
                  placeholder={'VD: Tin VIP'}
                  value={selectedPostType}
                  name={'postType'}
                ></MySelect>
              </FormGroup>
            </div>
            <div className="flex-1">
              <FormGroup>
                <Label className="font-bold">Chọn thời gian</Label>
                <MySelect
                  options={timePackage}
                  control={control}
                  error={errors.time?.message}
                  placeholder={'VD: Đăng theo ngày'}
                  value={selectedTime}
                  name={'time'}
                ></MySelect>
              </FormGroup>
            </div>
            <div className="flex-1">
              <FormGroup>
                <Label className="font-bold">Chọn số ngày</Label>
                <MySelect
                  options={timeCount}
                  control={control}
                  error={errors.timeNumber?.message}
                  placeholder={'VD: 2 tuần'}
                  value={selectedTimeNumber}
                  name={'timeNumber'}
                ></MySelect>
              </FormGroup>
            </div>
          </div>
          <div>
            <FormGroup>
              <Label className="font-bold">Chọn phương thức thanh toán</Label>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <i className="fa-regular text-primary fa-circle-check"></i>
                  <span>Trừ tiền trong tài khoản Trotot</span>
                </div>
                <span className="text-sm">
                  Số dư tài khoản hiện tại:{' '}
                  <span className="font-bold text-primary">
                    {formatPrice(profile?.balance)} <span>&#8363;</span>
                  </span>
                </span>
              </div>
            </FormGroup>
          </div>
          {selectedPostType?.value && selectedTime?.value && selectedTimeNumber?.value && (
            <FormGroup>
              <div className="divider font-bold">Thông tin thanh toán</div>
              <div className="w-full flex flex-col space-y-2 pb-4">
                <div className="flex items-center justify-between space-x-2">
                  <span>Tin đăng:</span>
                  <span className="font-bold line-clamp-1">{post.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Loại tin:</span>
                  <span className="font-bold">{watcherPostType.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hình thức đăng:</span>
                  <span className="font-bold">{watcherTime.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Thời hạn:</span>
                  <span className="font-bold">{watcherTimeNumber.label}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Tổng thanh toán:</span>
                  <span className="font-bold text-primary">
                    {formatPrice(+amount)}
                    <span>&#8363;</span>
                  </span>
                </div>
              </div>
              {profile.balance >= amount ? (
                <ButtonPrimary
                  title={isLoading ? 'Đang đăng tin' : 'Thanh toán ngay'}
                  handleClick={handleSubmit(createPost)}
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              ) : (
                <div className="flex flex-col space-y-5">
                  <div className="bg-red-100 p-3.5 rounded-lg text-center text-red-500">
                    <i className="fa-light fa-circle-exclamation"></i>
                    <span>
                      {' '}
                      Tài khoản của bạn không đủ số dư để thanh toán tin đăng. Vui lòng nạp thêm
                      tiền vào tài khoản và thử lại sau.
                    </span>
                  </div>
                  <ButtonSecondary
                    title={'Nạp tiền vào tài khoản'}
                    isPrimary={false}
                    styles={'p-2 text-center'}
                    className={'w-full'}
                    handleClick={() => router.push(`/deposit`)}
                  />
                </div>
              )}
            </FormGroup>
          )}
        </div>
      )}
    </div>
  )
}
