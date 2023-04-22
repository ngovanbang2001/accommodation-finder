import api from "apis/api";
import queryString from "query-string";

export const MessageAPI = {
  async getMessages({ id, query }) {
    return await api.get(`/message/${id}?${queryString.stringify(query)}`);
  },

  async sendMessage({ chatId, senderId, content, image, video }) {
    return await api.post(`/message`, {
      chatId,
      senderId,
      content,
      image,
      video,
    });
  },
};
