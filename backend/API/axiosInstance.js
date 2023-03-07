const axios = require("axios");
const defaultProxy = {
  host: process.env.SERVER_IP,
  port: process.env.SERVER_PORT,
};

const axiosInstance = axios.create({
  baseURL: `https://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/`,
  proxy: defaultProxy,
});

module.exports = axiosInstance;
