import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ButtonPrimary from '../button/ButtonPrimary'
import { Label } from '../label'
import { Input } from '../input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormGroup from '../common/FormGroup'
import MySelect from '../select/Select'
import SelectContainer from '../common/SelectContainer'
import UploadImages from '../upload-media/UploadImages'
import UploadVideo from '../upload-media/UploadVideo'
import { PostAPI } from 'apis/post'
import dynamic from 'next/dynamic'
const MyEditor = dynamic(() => import('../my-editor/Editor'), {
  ssr: false,
})
import { addressAPI } from 'apis/address'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ModalPreviewPost from '../modal/ModalPreviewPost'
import InputWithoutValidate from '../input/InputWithoutValidate'
import { categoryTitleConfig, tradingConfig } from 'configs/configs'
const schema = yup
  .object({
    title: yup
      .string()
      .required('Vui lòng nhập Tiêu đề')
      .min(20, 'Tiêu đề tối thiểu 20 ký tự')
      .max(200, 'Tiêu đề tối đa 200 ký tự'),
    street: yup
      .string()
      .required('Vui lòng nhập tên đường')
      .min(5, 'Tiêu đề tối thiểu 5 ký tự')
      .max(50, 'Tiêu đề tối đa 50 ký tự'),
    area: yup
      .number()
      .typeError('Diện tích phải là một số dương')
      .required('Vui lòng nhập diện tích')
      .positive('Diện tích phải là một số dương'),
    price: yup
      .number()
      .typeError('Giá cho thuê phải là một số dương')
      .required('Vui lòng nhập giá cho thuê')
      .positive('Giá cho thuê phải là một số dương'),

    province: yup.object().shape({
      value: yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
      label: yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
    }),

    district: yup.object().shape({
      value: yup.string().required('Vui lòng chọn Quận/Huyện'),
      label: yup.string().required('Vui lòng chọn Quận/Huyện'),
    }),
    ward: yup.object().shape({
      value: yup.string().required('Vui lòng chọn Phường/Xã'),
      label: yup.string().required('Vui lòng chọn Phường/Xã'),
    }),
    isStayWithHost: yup
      .string()
      .required('Vui lòng chọn hình thức ở')
      .oneOf(['1', '2'], 'Bạn chỉ có thể chọn Có hoặc Không'),

    isPrivateToilet: yup
      .string()
      .required('Vui lòng chọn hình thức vệ sinh')
      .oneOf(['1', '2'], 'Bạn chỉ có thể chọn Có hoặc Không'),
    isFurniture: yup.string().required('Vui lòng chọn tình trạng nội thất').oneOf(['1', '2', '3']),
  })
  .required()

export default function PostNewContent({ category, setTabActive, setPost, tradingForm }) {
  const profile = useSelector((state) => state.auth.profile)
  const [imageLength, setImageLength] = useState(null)
  const [base64List, setBase64List] = useState([])
  const [base64Video, setBase64Video] = useState(null)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [houseNumber, setHouseNumber] = useState(null)
  const [lane, setLane] = useState(null)
  const [description, setDescription] = useState('')
  const [postPreview, setPostPreview] = useState(null)
  const [deposit, setDeposit] = useState(null)
  const [specificAddress, setSpecificAddress] = useState(
    'số 20, ngõ 546, đường Trần Cung, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Thành phố Hà Nội.'
  )
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const [errorImage, setErrorImage] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const watcherIsStayWithHost = watch('isStayWithHost')
  const watcherIsPrivateToilet = watch('isPrivateToilet')
  const watcherIsFurniture = watch('isFurniture')
  const watcherProvince = watch('province')
  const watcherStreet = watch('street')
  const watcherDistrict = watch('district')
  const watcherWard = watch('ward')

  const handleSetPost = (values) => {
    let data = {
      ...values,
      province: values.province.value,
      district: values.district.value,
      ward: values.ward.value,
      category,
      images: base64List,
      video: base64Video,
      tradingForm,
      lane,
      houseNumber,
      description,
      deposit,
    }

    return Object.fromEntries(Object.entries(data).filter(([_, v]) => v))
  }

  const onSubmitHandler = async (values) => {
    if (!Object.keys(errors).length && imageLength >= 3 && imageLength <= 10) {
      setTabActive(2)
      const data = handleSetPost(values)
      setPost({ ...data })
      setErrorImage('')
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (!imageLength || imageLength < 3) {
        setErrorImage('Cần tối thiểu 3 hình ảnh.')
      }
      if (description.length < 100) {
        setErrorDescription('Mô tả tối thiểu 100 ký tự')
      }
    }
  }, [errors])
  //fetchData
  useEffect(() => {
    ;(async () => {
      try {
        const res = await addressAPI.getProvinces()
        if (res) {
          const provincesData = res.map((item) => {
            const { id, fullName } = item
            return {
              value: id,
              label: fullName,
            }
          })
          setProvinces(provincesData)
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        if (watcherProvince?.value) {
          setSelectedProvince(watcherProvince)
          setSelectedDistrict(null)
          setSelectedWard(null)
          const res = await addressAPI.getDistricts(watcherProvince.value)
          if (res) {
            const districtsData = res.map((item) => {
              const { id, fullName } = item
              return {
                value: id,
                label: fullName,
              }
            })
            setDistricts(districtsData)
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [watcherProvince])

  useEffect(() => {
    ;(async () => {
      try {
        if (watcherDistrict?.value) {
          setSelectedDistrict(watcherDistrict)
          setSelectedWard(null)
          const res = await addressAPI.getWards(watcherDistrict.value)
          if (res) {
            const wardsData = res.map((item) => {
              const { id, fullName } = item
              return {
                value: id,
                label: fullName,
              }
            })
            setWards(wardsData)
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [watcherDistrict])

  useEffect(() => {
    if (watcherWard) {
      setSelectedWard(watcherWard)
    }
  }, [watcherWard])

  useEffect(() => {
    if (
      watcherStreet ||
      selectedWard?.label ||
      selectedDistrict?.label ||
      selectedProvince?.label
    ) {
      setSpecificAddress(
        `${houseNumber ? houseNumber + ', ' : ''}${lane ? lane + ', ' : ''}${
          watcherStreet ? watcherStreet + ', ' : ''
        }${selectedWard?.label ? selectedWard?.label + ', ' : ''}${
          selectedDistrict?.label ? selectedDistrict?.label + ', ' : ''
        }${selectedProvince?.label ? selectedProvince?.label + '.' : ''}`
      )
    }
  }, [houseNumber, lane, watcherStreet, selectedDistrict, selectedWard, selectedProvince])

  const handleShowModalPreview = (values) => {
    const data = handleSetPost(values)
    setPostPreview({ ...data })
    setPost({ ...data })
    const modal = document.getElementById('modal-preview-post-id')
    if (modal) {
      modal.click()
    }
  }

  const handleDone = (tab) => {
    setTabActive(tab)
  }

  const handleSetDescription = (des) => {
    setDescription(des)
    if (des.length < 100) {
      setErrorDescription('Mô tả tối thiểu 100 ký tự')
    } else {
      setErrorDescription('')
    }
  }
  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="m-0 font-bold text-xl">
        {`Biên tập nội dung tin đăng ${tradingConfig[tradingForm]} ${categoryTitleConfig[category]}`}
      </div>
      <div className="flex flex-col justify-center">
        <div className="md:flex items-center md:space-x-2 ">
          <UploadImages
            base64List={base64List}
            setBase64List={setBase64List}
            imageLength={imageLength}
            setImageLength={setImageLength}
            errorImage={errorImage}
            setErrorImage={setErrorImage}
          />
          <UploadVideo base64Video={base64Video} setBase64Video={setBase64Video} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormGroup>
          <Label htmlFor={'title'}>Tiêu đề</Label>
          <Input
            control={control}
            error={errors.title?.message}
            name={'title'}
            placeholder={'VD: Cho thuê phòng trọ giá rẻ đường Trần Cung'}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label>Mô tả chi tiết</Label>
          <div>
            <MyEditor
              value={description}
              placeholder={'Nhập mô tả chi tiết cho tin đăng...'}
              onBlurP={({ res }) => handleSetDescription(res)}
            />
            <div className="h-[24px]">
              {errorDescription?.length > 0 && (
                <span className="text-red-500 mt-1 text-sm font-normal">{errorDescription}</span>
              )}
            </div>
          </div>
        </FormGroup>

        <div>
          <div className="md:flex items-center md:space-x-2">
            <div className="flex flex-col space-y-2 md:w-1/3">
              <FormGroup>
                <Label>Tỉnh/Thành phố</Label>
                <MySelect
                  options={provinces}
                  control={control}
                  error={errors.province?.label?.message}
                  placeholder={'VD: Thành phố Hà Nội'}
                  name={'province'}
                  value={selectedProvince}
                ></MySelect>
              </FormGroup>
            </div>
            <div className="flex flex-col space-y-2 md:w-1/3">
              <FormGroup>
                <Label>Quận/Huyện</Label>
                <MySelect
                  options={districts}
                  control={control}
                  placeholder={'VD: Quận Bắc Từ Liêm'}
                  error={errors.district?.label?.message}
                  name={'district'}
                  value={selectedDistrict}
                ></MySelect>
              </FormGroup>
            </div>
            <div className="flex flex-col space-y-2 md:w-1/3">
              <FormGroup>
                <Label>Phường/Xã</Label>
                <MySelect
                  options={wards}
                  control={control}
                  error={errors.ward?.label?.message}
                  placeholder={'VD: Phường Cổ Nhuế 1'}
                  name={'ward'}
                  value={selectedWard}
                ></MySelect>
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="md:flex items-center md:space-x-2">
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
              <Label htmlFor={'street'} isRequired={false}>
                Tên đường
              </Label>
              <Input
                control={control}
                error={errors.street?.message}
                name={'street'}
                placeholder={'VD: đường Trần Cung'}
              ></Input>
            </FormGroup>
          </div>
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
              <Label htmlFor={'lane'} isRequired={false}>
                Tên ngõ
              </Label>
              <InputWithoutValidate
                placeholder={'VD: ngõ 123'}
                value={lane}
                name={'lane'}
                onChange={(e) => setLane(e.target.value)}
              />
            </FormGroup>
          </div>
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
              <Label htmlFor={'houseNumber'} isRequired={false}>
                Số nhà
              </Label>
              <InputWithoutValidate
                placeholder={'VD: số 20'}
                value={houseNumber}
                name={'houseNumber'}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <FormGroup>
            <Label>Địa chỉ cụ thể</Label>
            <input
              className="w-full p-3 rounded-lg border border-gray-200 flex-1 outline-none text-gray-400"
              disabled
              value={specificAddress}
            />
          </FormGroup>
        </div>
        <div>
          <div className="">
            <div className="flex flex-col space-y-2 mt-4">
              <FormGroup>
                <Label>Chung chủ</Label>
                <div className="grid md:grid-cols-3 grid-cols-2 space-x-5 px-2">
                  <SelectContainer
                    control={control}
                    name={'isStayWithHost'}
                    label={'Chung chủ'}
                    value={1}
                    checked={watcherIsStayWithHost === '1'}
                  />
                  <SelectContainer
                    control={control}
                    name={'isStayWithHost'}
                    value={2}
                    label={'Không chung chủ'}
                    checked={watcherIsStayWithHost === '2'}
                  />
                </div>
                {errors.isStayWithHost?.message.length > 0 && (
                  <span className="text-red-500 text-sm font-normal">
                    {errors.isStayWithHost?.message}
                  </span>
                )}
              </FormGroup>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <FormGroup>
                <Label>Vệ sinh</Label>
                <div className="grid md:grid-cols-3 grid-cols-2 space-x-5 px-2">
                  <SelectContainer
                    control={control}
                    name={'isPrivateToilet'}
                    value={'1'}
                    label={'Vệ sinh khép kín'}
                    checked={watcherIsPrivateToilet === '1'}
                  />
                  <SelectContainer
                    control={control}
                    name={'isPrivateToilet'}
                    value={'2'}
                    label={'Vệ sinh chung'}
                    checked={watcherIsPrivateToilet === '2'}
                  />
                </div>
                {errors.isPrivateToilet?.message.length > 0 && (
                  <span className="text-red-500 text-sm font-normal">
                    {errors.isPrivateToilet?.message}
                  </span>
                )}
              </FormGroup>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <FormGroup>
                <Label>Nội thất</Label>
                <div className="grid grid-cols-3 space-x-5 px-2">
                  <SelectContainer
                    control={control}
                    name={'isFurniture'}
                    value={'1'}
                    label={'Đầy đủ'}
                    checked={watcherIsFurniture === '1'}
                  />
                  <SelectContainer
                    control={control}
                    name={'isFurniture'}
                    value={'2'}
                    label={'Cơ bản'}
                    checked={watcherIsFurniture === '2'}
                  />
                  <SelectContainer
                    control={control}
                    name={'isFurniture'}
                    value={'3'}
                    label={'Không có'}
                    checked={watcherIsFurniture === '3'}
                  />
                </div>
                {errors.isFurniture?.message.length > 0 && (
                  <span className="text-red-500 text-sm font-normal">
                    {errors.isFurniture?.message}
                  </span>
                )}
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="md:flex items-center md:space-x-2">
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
              <Label htmlFor={'area'}>Diện tích</Label>
              <Input
                control={control}
                error={errors.area?.message}
                placeholder={'20'}
                name={'area'}
              ></Input>
            </FormGroup>
          </div>
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
              <Label htmlFor={'price'}>Giá thuê</Label>
              <Input
                control={control}
                error={errors.price?.message}
                placeholder={'4.000.000'}
                name={'price'}
              ></Input>
            </FormGroup>
          </div>
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
              <Label htmlFor={'price'} isRequired={false}>
                Tiền cọc
              </Label>
              <InputWithoutValidate
                placeholder={'VD: 25'}
                value={deposit}
                name={'deposit'}
                type={'number'}
                onChange={(e) => setDeposit(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
        <div>
          <div className="m-0 font-bold text-xl">Thông tin liên hệ</div>
          <div className="flex items-center space-x-2">
            <div className="flex flex-col space-y-2 w-1/2">
              <FormGroup>
                <Label>Họ tên</Label>
                <Input
                  control={control}
                  disabled
                  name={'displayName'}
                  placeholder={profile?.displayName}
                ></Input>
              </FormGroup>
            </div>
            <div className="flex flex-col space-y-2 w-1/2">
              <FormGroup>
                <Label>Số điện thoại</Label>
                <Input
                  control={control}
                  name={'phoneNumber'}
                  disabled
                  placeholder={profile?.phoneNumber}
                ></Input>
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 pt-4 pb-8">
          <ButtonPrimary
            title="Xem trước"
            isPrimary={false}
            className={'w-full'}
            handleClick={handleSubmit((values) => handleShowModalPreview(values))}
          />
          <ButtonPrimary title="Tiếp tục" className="bg-primary w-full" type="submit" />
        </div>
        <ModalPreviewPost
          id={'modal-preview-post'}
          postPreview={postPreview}
          handleDone={handleDone}
        />
      </form>
    </div>
  )
}

PostNewContent.propTypes = {
  type: PropTypes.number.isRequired,
}
