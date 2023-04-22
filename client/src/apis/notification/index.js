import api from "apis/api";
import queryString from "query-string";

export const notificationAPI = {
  async getNotifications(query) {
    return api.get(`/notification?${queryString.stringify(query)}`);
  },

  async getTotalNotificationUnViewed() {
    return api.get(`/notification/unViewed`);
  },

  async markRead(id) {
    return api.post(`/notification/markRead/${id}`);
  },

  async getNotificationsUnViewed(query) {
    return api.get(
      `/notification/unViewedNotification?${queryString.stringify(query)}`
    );
  },

  async markAllViewed() {
    return api.post(`/notification/markAllViewed`);
  },
};
