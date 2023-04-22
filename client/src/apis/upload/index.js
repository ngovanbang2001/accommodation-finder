import api from "apis/api";

export const uploadAPI = {
  async uploadImage(data) {
    return await api.post("/uploadImage", { ...data });
  },
};
