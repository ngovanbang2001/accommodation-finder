import { authAPI } from 'apis/auth'
import { userAPI } from 'apis/user'
import { call, put } from 'redux-saga/effects'
import { saveTokenToCookie } from 'utils/auth'
import { authUpdateProfile, signUp } from './auth-slice'
import { toast } from 'react-toastify'

export function* handleLogin({ payload: { token, fcmToken } }) {
  try {
    const res = yield call(authAPI.login, { token, fcmToken })
    if (res.accessToken && res.refreshToken) {
      saveTokenToCookie({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        sessionId: res.sessionId,
      })
      try {
        const profile = yield call(userAPI.getProfile)
        yield put(authUpdateProfile(profile))
      } catch (e) {
        console.log(e)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export function* handleSignUp({ payload: { email, username, password } }) {
  try {
    const res = yield call(authAPI.signUp, { email, username, password })
    if (res.account) {
      try {
        yield put(signUp(res))
      } catch (e) {
        console.log(e)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export function* handleLoginWithPassword({ payload: { username, password } }) {
  try {
    const res = yield call(authAPI.loginWithPassword, { username, password })
    if (res.accessToken && res.refreshToken) {
      saveTokenToCookie({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        sessionId: res.sessionId,
      })
      try {
        const profile = yield call(userAPI.getProfile)
        yield put(authUpdateProfile(profile))
      } catch (e) {
        console.log(e)
      }
    }
  } catch (e) {
    console.log(e)
    toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!', {
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

export function* handleRefreshToken({ payload }) {
  const res = yield call(authAPI.refreshToken, { refreshToken: payload })
  if (res.accessToken && res.refreshToken) {
    saveTokenToCookie({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    })
    const profile = yield call(userAPI.getProfile)
    yield put(authUpdateProfile(profile))
  }
}
