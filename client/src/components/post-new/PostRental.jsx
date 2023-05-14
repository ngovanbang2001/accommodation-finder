import React, { useState, useEffect } from 'react'
import ButtonPrimary from '../button/ButtonPrimary'
import FormGroup from '../common/FormGroup'
import InputWithoutValidate from '../input/InputWithoutValidate'
import { Label } from '../label'
import { Input } from '../input'
import dynamic from 'next/dynamic'
const MyEditor = dynamic(() => import('../my-editor/Editor'), {
  ssr: false,
})
import MySelect from '../select/Select'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
  categoryConfig,
  categoryTitleConfig,
  tradingConfig,
  tradingFormConfig,
} from 'configs/configs'
import { addressAPI } from 'apis/address'
const schema = yup
  .object({
    title: yup.string().required('Vui lòng nhập Tiêu đề'),
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
  })
  .required()
const PostRental = ({ category, setTabActive, setPost, tradingForm }) => {
  const profile = useSelector((state) => state.auth.profile)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [houseNumber, setHouseNumber] = useState(null)
  const [lane, setLane] = useState(null)
  const [street, setStreet] = useState(null)
  const [floor, setFloor] = useState(null)
  const [specificAddress, setSpecificAddress] = useState(
    'số 20, ngõ 546, đường Trần Cung, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Thành phố Hà Nội.'
  )
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [description, setDescription] = useState(null)

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
  const watcherProvince = watch('province')
  const watcherDistrict = watch('district')
  const watcherWard = watch('ward')
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
    if (watcherWard) {
      setSelectedWard(watcherWard)
    }
  }, [watcherWard])

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
    if (selectedWard?.label || selectedDistrict?.label || selectedProvince?.label) {
      setSpecificAddress(
        `${houseNumber ? houseNumber + ', ' : ''}${lane ? lane + ', ' : ''}${
          street ? street + ', ' : ''
        }${selectedWard?.label ? selectedWard?.label + ', ' : ''}${
          selectedDistrict?.label ? selectedDistrict?.label + ', ' : ''
        }${selectedProvince?.label ? selectedProvince?.label + '.' : ''}`
      )
    }
  }, [houseNumber, lane, street, selectedDistrict, selectedWard, selectedProvince])
  const handleSetPost = (values) => {
    let data = {
      ...values,
      province: values.province.value,
      district: values.district.value,
      ward: values.ward.value,
      category,
      tradingForm,
      lane,
      houseNumber,
      description,
    }

    return Object.fromEntries(Object.entries(data).filter(([_, v]) => v))
  }

  const onSubmitHandler = async (values) => {
    if (!Object.keys(errors).length) {
      setTabActive(2)
      const data = handleSetPost(values)
      setPost({ ...data })
    } else {
    }
  }
  return (
    <div className="w-full flex flex-col space-y-2 ">
      <div className="m-0 font-bold text-xl">
        {`Biên tập nội dung tin đăng ${tradingConfig[tradingForm]} ${categoryTitleConfig[category]}`}
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
                  value={selectedProvince}
                  name={'province'}
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
                  value={selectedWard}
                  name={'ward'}
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
              <InputWithoutValidate
                placeholder={'VD: đường Trần Cung'}
                value={street}
                name={'street'}
                onChange={(e) => setStreet(e.target.value)}
              />
            </FormGroup>
          </div>
          <div className="flex flex-col space-y-2 md:w-1/3">
            <FormGroup>
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
                placeholder={'VD: số 50'}
                value={houseNumber}
                name={'houseNumber'}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <FormGroup>
            <Label isRequired={false}>Địa chỉ cụ thể</Label>
            <input
              className="w-full p-3 rounded-lg border border-gray-200 flex-1 outline-none text-gray-400"
              disabled
              value={specificAddress}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Label>Mô tả chi tiết</Label>
          <div>
            <MyEditor
              value={description}
              placeholder={'Nhập mô tả chi tiết cho tin đăng...'}
              onBlurP={({ res }) => setDescription(res)}
            />
          </div>
        </FormGroup>
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
          <ButtonPrimary title="Tiếp tục" className="bg-primary w-full" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default PostRental
