import api from "apis/api";

export const ChatAPI = {
  async createChat(data) {
    return await api.post(`/chat`, { ...data });
  },
  async getuserChats(userId) {
    return await api.get(`/chat/${userId}`);
  },

  async getChat(id) {
    return await api.get(`/chat/test/${id}`);
  },

  async getNumberNewChat(id) {
    return await api.get(`/chat/numberNewMessage/${id}`);
  },

  async markViewedChat(id) {
    return await api.post(`/chat/markViewedChat/${id}`);
  },
};
