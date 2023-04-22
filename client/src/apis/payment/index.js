import api from "apis/api";

export const paymentAPI = {
  // async payment(data) {
  //   return await api.post(`/payment`, { ...data });
  // },

  async desposit({ id, amount }) {
    return await api.post(`/payment/${id}`, { amount });
  },
};
