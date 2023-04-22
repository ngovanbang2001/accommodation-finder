import api from "apis/api";
import queryString from "query-string";

export const NewAPI = {
  async createNew(data) {
    return await api.post("/new", { ...data });
  },

  async getNews(query) {
    return await api.get(`/new?${queryString.stringify(query)}`);
  },

  async getNewById(id) {
    return await api.get(`/new/${id}`);
  },

  async getLatestNews(newId) {
    return await api.get(`/new/latest?id=${newId}`);
  },

  async updateNew({ id, data }) {
    return await api.put(`/new/${id}`, { ...data });
  },

  async deleteNew(id) {
    return await api.delete(`/new/${id}`);
  },

  async markDisplay({ id, isActive }) {
    return await api.post(`/new/${id}`, { isActive });
  },

  async markOutstanding({ id, isOutstanding }) {
    return await api.post(`/new/outstanding/${id}`, { isOutstanding });
  },

  async createCategory(data) {
    return await api.post(`/new/category`, { ...data });
  },
};
