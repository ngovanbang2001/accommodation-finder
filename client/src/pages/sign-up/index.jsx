import React, { useEffect } from 'react'
import background from '@/assets/images/background.png'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from 'store/auth/auth-slice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useWindowSize from 'hooks/useWindowSize'
import { Input } from '@/components/input'
import Link from 'next/link'
import { useRouter } from 'next/router'

const schema = yup.object({
  email: yup.string().required('Vui lòng nhập email'),
  username: yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
})

export default function SignUp(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.account)
  const router = useRouter()
  const { width } = useWindowSize()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const handleSignUp = async (values) => {
    try {
      dispatch(signUp({ ...values }))
      router.push(`/sign-in`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className={'flex items-center justify-end'}
      style={
        width >= 1024
          ? {
              backgroundImage: `url(${background.src})`,
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '700px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : null
      }
    >
      <div className="px-6 py-8 w-[500px] bg-base-100 rounded-lg lg:box-shadow mx-auto lg:mr-32 lg:my-0 my-8">
        <div className="flex justify-between">
          <div className="font-bold text-xl text-center block pb-4">Đăng ký</div>
          <Link href="/sign-in" className="px-4 py-2 bg-primary rounded-lg text-white">
            Đăng nhập
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col gap-y-1 py-2">
            <label className="font-semibold">
              Email <span className="text-red-500 font-bold"> *</span>
            </label>
            <Input
              control={control}
              error={errors.email?.message}
              placeholder={'abc@gmail.com'}
              name={'email'}
            ></Input>
          </div>
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
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}
