import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favoritePosts: [],
}
const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    setFavoritePosts: (state) => {
      return {
        ...state,
      }
    },
    updateFavoritePosts: (state, action) => {
      return {
        ...state,
        favoritePosts: action.payload,
      }
    },
  },
})

export const { setFavoritePosts, updateFavoritePosts } = postSlice.actions

export default postSlice.reducer
