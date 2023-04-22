import api from 'apis/api'
import queryString from 'query-string'
export const PostAPI = {
  async createPost(data) {
    return await api.post('/post', { ...data })
  },

  async getAllPost(query) {
    return await api.get(`/post/all?${queryString.stringify(query)}`)
  },

  async getPost(id) {
    return await api.get(`/post/${id}`)
  },

  async getPostsByUser(query) {
    return await api.get(`post/postsByUser?${queryString.stringify(query)}`)
  },

  async sortPost(query) {
    return await api.get(`post/sortPost?${queryString.stringify(query)}`)
  },

  async filterPost(data) {
    return await api.post(`post/filterPost?${queryString.stringify({ ...data })}`)
  },

  async approvePost(postId, data) {
    return await api.post(`post/approvePost/${postId}`, { ...data })
  },

  async toggleFavorite(data) {
    return await api.post(`favorite`, { ...data })
  },

  async getFavoritePosts() {
    return await api.get(`favorite`)
  },

  async getRelatedPost({ id, data }) {
    return await api.get(`post/related/${id}?${queryString.stringify(data)}`)
  },
}
