import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import icon_facebook from '@/assets/images/icons/facebook.svg'
import icon_google from '@/assets/images/icons/google.svg'
import {
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from '@firebase/auth'
import background from '@/assets/images/background.png'
import { auth } from '../../configs/firebaseConfig'
import { authAPI } from 'apis/auth'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, loginWithPassword } from 'store/auth/auth-slice'
import { useController, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatPhoneNumerDisplay } from 'utils/common'
import OtpInput from 'react-otp-input'
import ModalLockAccount from '@/components/modal/ModalLockAccount'
import useWindowSize from 'hooks/useWindowSize'
import Link from 'next/link'
import { Input } from '@/components/input'
import { toast } from 'react-toastify'

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
const schema = yup.object({
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập điện thoại'),
})

export default function SignIn(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.profile)
  const [error, setError] = useState('')
  const [number, setNumber] = useState('')
  const [flag, setFlag] = useState(false)
  const [result, setResult] = useState('')
  const [code, setCode] = useState('')
  const { width } = useWindowSize()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({
    mode: 'onChange',
  })
  const { field } = useController({
    control,
    name: 'phoneNumber',
    defaultValue: '',
  })
  const watcherPhoneNumber = watch('phoneNumber')
  const handleChange = (code) => {
    setCode(code)
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      auth
    )
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  const loginWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        const fcmToken = localStorage.getItem('fcmToken')
        dispatch(authLogin({ token: result.user.accessToken, fcmToken }))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const loginWithFacebook = () => {
    signInWithPopup(auth, new FacebookAuthProvider())
      .then(async (result) => {
        const fcmToken = localStorage.getItem('fcmToken')
        dispatch(authLogin({ token: result.user.accessToken, fcmToken }))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    if (user?.role > 0) {
      router.push(`/managements/post`)
    } else if (user?.role === 0) {
      router.push(`/`)
    }
  }, [user, router])

  const getOtp = async () => {
    const phoneNumberData = `+84${watcherPhoneNumber.substring(1)}`
    try {
      const response = await setUpRecaptha(phoneNumberData)
      setResult(response)
      setFlag(true)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (code?.length === 6) {
        try {
          const res = await result.confirm(code)
          const fcmToken = localStorage.getItem('fcmToken')
          dispatch(authLogin({ token: res.user.accessToken, fcmToken }))
        } catch (err) {
          console.log(err)
          setCode('')
          setError(err.message)
        }
      }
    })()
  }, [code])

  const handleLoginPermission = () => {
    router.push(`sign-in/account`)
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
          <div className="font-bold text-xl text-center block pb-4">Đăng nhập</div>
          <Link href="/sign-up" className="px-4 py-2 bg-primary rounded-lg text-white">
            Đăng ký
          </Link>
        </div>
        <div className="flex justify-between">
          <div
            className="text-center pb-2 text-primary cursor-pointer"
            onClick={handleLoginPermission}
          >
            Đăng nhập bằng tài khoản
          </div>
        </div>

        <Fragment>
          <form onSubmit={handleSubmit(getOtp)}>
            {!flag && (
              <>
                <div className="flex flex-col gap-y-1 py-2">
                  <label className="font-semibold">
                    Số điện thoại <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type={'number'}
                    value={watcherPhoneNumber}
                    {...field}
                    name={'phoneNumber'}
                    placeholder={'Nhập số điện thoại của bạn'}
                    className={'p-3 border border-primary rounded-lg focus:border-2'}
                  />
                  {errors.phoneNumber?.message && (
                    <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>
                  )}
                </div>
                <div id="recaptcha-container"></div>
                <button
                  type="submit"
                  className="w-full bg-primary p-3 rounded-lg text-white font-bold my-2"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </form>
          <div className="">
            {flag && (
              <div>
                <div className="flex flex-col gap-y-1 py-2">
                  <label className="font-semibold">
                    Số điện thoại <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type={'text'}
                    value={formatPhoneNumerDisplay(watcherPhoneNumber)}
                    disabled
                    onChange={(e) => setNumber(e.target.value)}
                    className={'p-3 border bg-gray-00 border-gray-200 rounded-lg text-gray-400'}
                  />
                </div>
                <div className="flex flex-col items-center py-2">
                  <span className="font-semibold text-lg space-y-3">Xác thực tài khoản</span>
                  <span className="text-center">
                    Vui lòng nhập mã OTP đã được gửi về số điện thoại
                    <span className="text-primary">
                      {' '}
                      {formatPhoneNumerDisplay(watcherPhoneNumber)}
                    </span>
                  </span>
                </div>

                <OtpInput
                  value={code}
                  onChange={handleChange}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '4px 0',
                  }}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: '1px solid #CFD3DB',
                    borderRadius: '8px',
                    width: '50px',
                    height: '46px',
                    fontSize: '16px',
                    color: '#000',
                    fontWeight: '400',
                    caretColor: 'blue',
                  }}
                  focusStyle={{
                    border: '1px solid #1687fb',
                    outline: 'none',
                  }}
                />

                <button className="w-full bg-gray-300 p-3 rounded-lg text-white font-bold my-0 mt-3">
                  Tiếp tục
                </button>
              </div>
            )}
          </div>
        </Fragment>
        <div className="text-center py-2">hoặc</div>
        <div className="text-center flex flex-col gap-y-2">
          <div
            className="flex items-center justify-center gap-x-2 rounded-lg shadow-lg p-4 cursor-pointer"
            onClick={loginWithFacebook}
          >
            <Image src={icon_facebook} alt={'icon-facebook'} width={30} height={30} />
            <span>Đăng nhập với Facebook</span>
          </div>
          <div
            className="flex items-center justify-center gap-x-2 rounded-lg shadow-lg p-4 cursor-pointer"
            onClick={() => loginWithGoogle()}
          >
            <Image src={icon_google} alt={'icon-google'} width={30} height={30} />
            <span>Đăng nhập với Google</span>
          </div>
        </div>
        <ModalLockAccount id={'modal-lock-account'} />
      </div>
    </div>
  )
}
