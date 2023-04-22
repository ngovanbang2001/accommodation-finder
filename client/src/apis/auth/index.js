import api from 'apis/api'
export const authAPI = {
  async login(data) {
    return await api.post(`auth/login`, { ...data })
  },
  async refreshToken({ refreshToken }) {
    return await api.post(`auth/refreshToken`, { refreshToken })
  },
  async logout(sessionId) {
    return await api.post(`auth/logout`, { sessionId })
  },

  async signUp(data) {
    return await api.post(`auth/sign-up`, { ...data })
  },

  async loginWithPassword(data) {
    return await api.post(`auth/loginWithPassword`, { ...data })
  },
}
