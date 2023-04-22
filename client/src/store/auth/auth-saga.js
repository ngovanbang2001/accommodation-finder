import { takeLatest } from 'redux-saga/effects'
import {
  handleLogin,
  handleRefreshToken,
  handleLoginWithPassword,
  handleSignUp,
} from './auth-handler'
import { authLogin, authRefreshToken, loginWithPassword, signUp } from './auth-slice'
export default function* authSaga() {
  yield takeLatest(authLogin.type, handleLogin)
  yield takeLatest(signUp.type, handleSignUp)
  yield takeLatest(loginWithPassword.type, handleLoginWithPassword)
  yield takeLatest(authRefreshToken.type, handleRefreshToken)
}
