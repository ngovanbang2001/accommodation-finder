import React, { Fragment, useEffect } from 'react'

import background from '@/assets/images/background.png'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithPassword } from 'store/auth/auth-slice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ModalLockAccount from '@/components/modal/ModalLockAccount'
import { Input } from '@/components/input'
import { toast } from 'react-toastify'
import Link from 'next/link'

const schema = yup.object({
  username: yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
})

export default function Permisstion() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.profile)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (user?.role > 0) {
      router.push(`/managements/post`)
    } else if (user?.role === 0) {
      router.push(`/`)
    }
  }, [user, router])

  const handleLogin = async (values) => {
    try {
      dispatch(loginWithPassword({ ...values }))
      console.log('bang')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className={'flex items-center justify-end'}
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '700px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="px-6 py-16 w-[500px] bg-base-100 rounded-lg box-shadow mr-32">
        <div className="flex justify-between">
          <span className="font-bold text-lg text-center block">Đăng nhập</span>
          <Link href="/sign-in" className="text-center pb-2 cursor-pointer">
            Về đăng nhập bằng số điện thọai
          </Link>
        </div>

        <Fragment>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-y-1 py-2">
              <label className="font-semibold">
                Tên đăng nhập <span className="text-red-500 font-bold"> *</span>
              </label>
              <Input
                control={control}
                error={errors.username?.message}
                placeholder={'abc'}
                name={'username'}
              ></Input>
            </div>
            <div className="flex flex-col gap-y-1 py-2">
              <label className="font-semibold">
                Mật khẩu <span className="text-red-500 font-bold"> *</span>
              </label>
              <Input
                control={control}
                error={errors.password?.message}
                placeholder={'*****'}
                name={'password'}
                type={'password'}
              ></Input>
            </div>
            <button
              type="submit"
              className="w-full bg-primary p-3 rounded-lg text-white font-bold my-2"
            >
              Đăng nhập
            </button>
          </form>
        </Fragment>
        <ModalLockAccount id={'modal-lock-account'} />
      </div>
    </div>
  )
}
