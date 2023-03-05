import axiosInstance from "./axiosInstance";
export default {
  alerts() {
    return { getAllAlerts: async () => axiosInstance.get(`/events`) };
  },
};
