import MainLayout from '@/components/layout/MainLayout'
import Head from 'next/head'
import '../../styles/globals.scss'
import 'swiper/css'
import 'swiper/css/pagination'
// import "react-image-lightbox/style.css";
import 'swiper/css/navigation'
import 'react-image-gallery/styles/css/image-gallery.css'
import 'react-quill/dist/quill.snow.css'
import { Fragment, useEffect } from 'react'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'swiper/css'
import 'react-best-tabs/dist/index.css'
import 'reactjs-popup/dist/index.css'
import 'swiper/css/pagination'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store, wrapper } from '../store/configStore'
import Router, { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { authRefreshToken, authUpdateProfile } from 'store/auth/auth-slice'
import { getToken, removeToken } from 'utils/auth'
import { requestPermission } from 'configs/firebaseConfig'
import { PostAPI } from 'apis/post'
import { setFavoritePosts, updateFavoritePosts } from 'store/post/post-slice'
import { userAPI } from 'apis/user'
import { socket } from 'utils/socket'
import ModalLockAccount from '@/components/modal/ModalLockAccount'
import Cookies from 'js-cookie'
import { async } from '@firebase/util'
import { authAPI } from 'apis/auth'

function App({ Component, pageProps }) {
  const Layout = Component.Layout ?? MainLayout

  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth.profile)

  useEffect(() => {
    ;(async () => {
      const { accessToken } = getToken()
      if (accessToken) {
        try {
          const profileData = await userAPI.getProfile()
          if (profileData) {
            dispatch(authUpdateProfile({ ...profileData }))
          }
          const res = await PostAPI.getFavoritePosts()
          if (res) {
            dispatch(updateFavoritePosts(res.favoritePosts))
          }
        } catch (e) {
          console.log(e)
        }
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (profile.id) {
        socket.emit('user-online', profile.id)
        if (profile.role > 0 && !Router.asPath.includes('managements')) {
          Router.replace('/managements/post')
        }
        if (!profile.isActive) {
          console.log('profile', profile)
          const sessionId = Cookies.get(process.env.NEXT_PUBLIC_SESSION_ID)
          const res = await authAPI.logout(sessionId)
          if (res.ok) {
            dispatch(authUpdateProfile({}))
            removeToken()
          }
          const modal = document.getElementById('modal-lock-account')
          if (modal) {
            modal.click()
          }
          Router.replace('/sign-in')
        }
      }
    })()
  }, [profile])

  useEffect(() => {
    ;(async () => {
      const fcmToken = await requestPermission()
      if (fcmToken) {
        localStorage.setItem('fcmToken', fcmToken)
      }
    })()
  }, [])
  return (
    <Layout>
      <Fragment>
        <Head>
          <meta name="title" content="Trọ tốt" property="og:title" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <meta
            content={
              'https://res.cloudinary.com/dqrn1uojt/image/upload/v1673861896/lweyfqaoa0imv1lnvcsc.jpg'
            }
            property="og:image"
          />
          <meta
            content={
              'https://res.cloudinary.com/dqrn1uojt/image/upload/v1673861896/lweyfqaoa0imv1lnvcsc.jpg'
            }
            property="og:image:secure_url"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta
            name="description"
            content="Kênh thông tin về bất động sản - số 1 tại Việt Nam."
            property="og:description"
          />

          <link rel="icon" href="/icon.png" />
          <title>Trọ tốt | Kênh thông tin bất động sản - số 1 Việt Nam</title>
        </Head>

        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ModalLockAccount id={'modal-lock-account'} />
      </Fragment>
    </Layout>
  )
}

export default wrapper.withRedux(App)
