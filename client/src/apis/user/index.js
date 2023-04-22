import api from 'apis/api'
import queryString from 'query-string'
export const userAPI = {
  async getProfile() {
    return await api.get(`user/me`)
  },

  async getProfileById(id) {
    return await api.get(`/user/${id}`)
  },

  async getAllAccounts(query) {
    return await api.get(`/user?${queryString.stringify(query)}`)
  },

  async updateAccount({ id, data }) {
    return await api.put(`/user/${id}`, { ...data })
  },

  async lockAccount({ id, data }) {
    return await api.post(`/user/lock/${id}`, { ...data })
  },
}
