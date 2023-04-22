import api from "apis/api";
import queryString from "query-string";

export const NewCategoryAPI = {
  async createCategory(data) {
    return await api.post(`category`, { ...data });
  },

  async getAllCategories(query) {
    return await api.get(`category/all?${queryString.stringify(query)}`);
  },

  async markDisplay({ id, status }) {
    return await api.post(`/category/${id}`, { status });
  },

  async updateCategory({ id, data }) {
    return await api.put(`/category/${id}`, { ...data });
  },

  async deleteCategory(id) {
    return await api.delete(`/category/${id}`);
  },
};
