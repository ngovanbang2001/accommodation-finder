import api from "apis/api";

export const addressAPI = {
  async getProvinces() {
    return await api.get("/province");
  },
  async getDistricts(province_id) {
    return await api.get(`/province/district/${province_id}`);
  },
  async getWards(district_id) {
    return await api.get(`/province/ward/${district_id}`);
  },
};
