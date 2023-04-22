import React, { useEffect, useState } from 'react'
import CharacteristicsItem from '@/components/characteristics/CharacteristicsItem'
import { Fragment } from 'react'
import FormGroup from '@/components/common/FormGroup'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AvatarWithUpload from '@/components/user/AvatarWithUpload'
import { useDispatch, useSelector } from 'react-redux'
import ButtonPrimary from '@/components/button/ButtonPrimary'
import { userAPI } from 'apis/user'
import { toast } from 'react-toastify'
import { authUpdateProfile } from 'store/auth/auth-slice'

const schema = yup.object({
  displayName: yup.string().required('Vui lòng nhập họ tên'),
})
export default function MyProfile() {
  const profile = useSelector((state) => state.auth.profile)
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (profile.displayName) {
      const initialValue = {}
      setAddress(profile.address)
      initialValue.displayName = profile.displayName
      reset({ ...initialValue })
    }
  }, [profile])

  const handleUpdate = async (values) => {
    try {
      const data = { ...values }
      if (address) {
        data.address = address
      }
      const res = await userAPI.updateAccount({
        id: profile.id,
        data: { ...data },
      })
      if (res.ok) {
        const profileRes = await userAPI.getProfile()
        dispatch(authUpdateProfile(profileRes))
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
  return (
    <div className={'my-4 lg:px-4 px-2 py-8 mx-auto flex items-center flex-col max-w-[700px]'}>
      {profile.id && (
        <div className={'w-full'}>
          <div className={'info-title'}>Thông tin tài khoản</div>
          <div>
            <div className={'flex justify-center mb-4'}>
              <AvatarWithUpload
                width={150}
                height={150}
                avatar={profile.avatar}
                userId={profile.id}
              />
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className={'flex-col flex space-y-2'}>
                <FormGroup isMb={false}>
                  <Label>Họ tên</Label>

                  <Input
                    control={control}
                    name={'displayName'}
                    error={errors.displayName?.message}
                    placeholder={'VD: Quang Thuận'}
                  />
                </FormGroup>

                <FormGroup>
                  <div className="font-bold w-[120px]">Địa chỉ cụ thể</div>
                  <input
                    type={'text'}
                    className={
                      'px-2 py-3 rounded-lg border border-gray-200 flex-1 outline-none focus:border-primary'
                    }
                    placeholder={'VD: 40, ngõ 562 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội.'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <div className="font-bold">Số điện thoại</div>
                  <div className={'flex items-center justify-between'}>
                    <CharacteristicsItem icon={'faPhone'}>
                      <span>{profile.phoneNumber}</span>
                    </CharacteristicsItem>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className="font-bold">Email</div>
                  <CharacteristicsItem icon={'faPhone'}>
                    <span>{profile.email}</span>
                  </CharacteristicsItem>
                </FormGroup>
              </div>
              <div>
                <ButtonPrimary className="w-[200px] float-right" title="Cập nhật" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
