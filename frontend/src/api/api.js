import axiosInstance from "./axiosInstance";
export default {
  alerts() {
    return {
      getAllAlerts: async () => axiosInstance.get(`/alert`),
      getAllTypes: async () => axiosInstance.get(`/types`),
      getAllWeapons: async () => axiosInstance.get(`/weapons`),
      postNewWeapon: async (newAlert) => axiosInstance.post(`/alert`, newAlert)
    };
  }
};
