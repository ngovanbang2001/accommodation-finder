import api from "apis/api";

export const statisticAPI = {
  async getInfo() {
    return await api.get("/statistic");
  },
};
