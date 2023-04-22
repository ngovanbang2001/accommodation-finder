import api from "apis/api";
import queryString from "query-string";

export const PostTypeAPI = {
  async createPostType(data) {
    return await api.post(`/type`, { ...data });
  },

  async updatePostType({ id, data }) {
    return await api.put(`/type/${id}`, { ...data });
  },

  async getPostType({ id }) {
    return await api.get(`/type/${id}`);
  },

  async getPostTypes(query) {
    return await api.get(`/type?${queryString.stringify(query)}`);
  },

  async deletePostType(id) {
    return await api.delete(`/type/${id}`);
  },
};
