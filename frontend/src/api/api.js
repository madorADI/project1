import axiosInstance from "./axiosInstance";
export default {
  alerts() {
    return {
      getAllAlerts: async () => axiosInstance.get(`/alerts/pres`),
      getAllTypes: async () => axiosInstance.get(`/types`),
      getAllWeapons: async () => axiosInstance.get(`/weapons`),
    };
  },
};
