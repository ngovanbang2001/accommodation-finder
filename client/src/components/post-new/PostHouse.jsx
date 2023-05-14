import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../button/ButtonPrimary'
import { Label } from '../label'
import { Input } from '../input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormGroup from '../common/FormGroup'
import MySelect from '../select/Select'
import UploadImages from '../upload-media/UploadImages'
import UploadVideo from '../upload-media/UploadVideo'
import { PostAPI } from 'apis/post'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import dynamic from 'next/dynamic'
const MyEditor = dynamic(() => import('../my-editor/Editor'), {
  ssr: false,
})
import InputWithoutValidate from '../input/InputWithoutValidate'
import ModalPreviewPost from '../modal/ModalPreviewPost'
import { categoryTitleConfig, tradingConfig } from 'configs/configs'
import { addressAPI } from 'apis/address'
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

    typeOfApartment: yup.object().shape({
      value: yup.string().required('Vui lòng chọn loại hình'),
      label: yup.string().required('Vui lòng chọn loại hình'),
    }),

    numberOfBedrooms: yup
      .number()
      .typeError('Số phòng ngủ phải là một số dương')
      .required('Vui lòng nhập số phòng ngủ')
      .positive('Số phòng ngủ phải là một số dương'),

    numberOfToilet: yup
      .number()
      .typeError('Số phòng vệ sinh phải là một số dương')
      .required('Vui lòng nhập số phòng vệ sinh')
      .positive('Số phòng vệ sinh phải là một số dương'),
  })
  .required()

const furnitureOptions = [
  { value: 3, label: 'Không có' },
  { value: 2, label: 'Cơ bản' },
  { value: 1, label: 'Đầy đủ' },
]
export default function PostHouse({ category, setTabActive, setPost, tradingForm }) {
  const profile = useSelector((state) => state.auth.profile)
  const [imageLength, setImageLength] = useState(null)
  const [description, setDescription] = useState('')
  const [base64List, setBase64List] = useState([])
  const [base64Video, setBase64Video] = useState(null)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [houseNumber, setHouseNumber] = useState(null)
  const [lane, setLane] = useState(null)
  const [apartmentCode, setApartmentCode] = useState(null)
  const [deposit, setDeposit] = useState(null)
  const [furniture, setFurniture] = useState(null)
  const [postPreview, setPostPreview] = useState(null)
  const [specificAddress, setSpecificAddress] = useState(
    'số 20, ngõ 546, đường Trần Cung, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Thành phố Hà Nội.'
  )
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [errorImage, setErrorImage] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    control,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const typeHouse = [
    { value: 1, label: 'Nhà mặt tiền' },
    { value: 2, label: 'Nhà ngõ, hẻm' },
    { value: 3, label: 'Nhà biệt thự' },
    { value: 4, label: 'Nhà phố liền kề' },
  ]
  console.log('e', errors)
  const watcherProvince = watch('province')
  const watcherStreet = watch('street')
  const watcherDistrict = watch('district')
  const watcherWard = watch('ward')
  const handleSetPost = (values) => {
    let data = {
      ...values,
      typeOfApartment: values.typeOfApartment.value,
      province: values.province.value,
      district: values.district.value,
      ward: values.ward.value,
      category,
      images: base64List,
      video: base64Video,
      tradingForm,
      lane,
      houseNumber,
      apartmentCode,
      description,
      isFurniture: furniture,
      deposit,
    }

    return Object.fromEntries(Object.entries(data).filter(([_, v]) => v))
  }
  const onSubmitHandler = async (values) => {
    if (!Object.keys(errors).length && imageLength >= 3 && imageLength <= 10) {
      setTabActive(2)
      const data = handleSetPost(values)
      setPost({ ...data })
    } else {
    }
  }
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
  }, [lane, houseNumber, watcherStreet, selectedDistrict, selectedWard, selectedProvince])

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
            setErrorImage={setErrorImage}
            errorImage={errorImage}
            setImageLength={setImageLength}
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
          <Label>Mô tả</Label>
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
              <Label htmlFor={'street'}>Tên đường</Label>
              <Input
                control={control}
                error={errors.street?.message}
                name={'street'}
                placeholder={'VD: đường Trần Cung'}
              ></Input>
            </FormGroup>
          </div>
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup htmlFor={'lane'}>
              <Label htmlFor={'lane'} isRequired={false}>
                Tên ngõ
              </Label>
              <InputWithoutValidate
                placeholder={'VD: ngõ 25'}
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
                placeholder={'VD: số nhà 20'}
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
            <div className="flex items-center space-x-2">
              <div className="flex flex-col space-y-2 w-full">
                <FormGroup>
                  <Label>Loại hình nhà ở</Label>
                  <MySelect
                    options={typeHouse}
                    control={control}
                    error={errors.typeOfApartment?.label?.message}
                    placeholder={'VD: Nhà mặt phố'}
                    name={'typeOfApartment'}
                  ></MySelect>
                </FormGroup>
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <FormGroup>
                  <Label isRequired={false}>Mã căn</Label>
                  <InputWithoutValidate
                    placeholder={'VD: CH952'}
                    value={apartmentCode}
                    name={'apartmentCode'}
                    onChange={(e) => setApartmentCode(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="md:flex items-center md:space-x-2">
              <div className="flex flex-col space-y-2 w-full">
                <FormGroup>
                  <Label htmlFor={'price'}>Số phòng ngủ</Label>
                  <Input
                    control={control}
                    error={errors.numberOfBedrooms?.message}
                    placeholder={'4'}
                    name={'numberOfBedrooms'}
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <FormGroup>
                  <Label htmlFor={'price'}>Số phòng vệ sinh</Label>
                  <Input
                    control={control}
                    error={errors.numberOfToilet?.message}
                    placeholder={'2'}
                    name={'numberOfToilet'}
                  ></Input>
                </FormGroup>
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <FormGroup>
                  <Label isRequired={false}>Nội thất</Label>
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: '6px 0',
                        borderRadius: '8px',
                        borderColor: '#e5e7eb',
                        marginBottom: '24px',
                      }),
                    }}
                    options={furnitureOptions}
                    onChange={(option) => {
                      setFurniture(option.value)
                    }}
                    isSearchable
                    placeholder={'Tình trạng nội thất'}
                  />
                </FormGroup>
              </div>
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
                placeholder={'VD: 2.000.000'}
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
      </form>
      <ModalPreviewPost
        id={'modal-preview-post'}
        postPreview={postPreview}
        handleDone={handleDone}
      />
    </div>
  )
}

PostHouse.propTypes = {
  type: PropTypes.number.isRequired,
}
