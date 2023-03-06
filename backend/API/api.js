const { serverCache } = require("./cache");

module.exports.getWithCacheAside = async (
  url,
  key,
  ttl = 60,
  fetchFunc,
  params
) => {
  if (serverCache().has(key)) {
    return serverCache().get(key);
  } else {
    const response = await fetchFunc(params);
    serverCache().set(key, response.data, ttl);
    return response.data;
  }
};
