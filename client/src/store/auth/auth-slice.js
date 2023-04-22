import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state) => {
      return {
        ...state,
      }
    },
    signUp: (state, action) => {
      return {
        ...state,
        account: action.payload?.account?.dataValues,
      }
    },
    loginWithPassword: (state) => {
      return {
        ...state,
      }
    },
    authRefreshToken: (state) => ({
      ...state,
    }),
    authUpdateProfile: (state, action) => {
      return {
        ...state,
        profile: { ...action.payload },
      }
    },
  },
})

export const { authLogin, signUp, authUpdateProfile, authRefreshToken, loginWithPassword } =
  authSlice.actions
export default authSlice.reducer
