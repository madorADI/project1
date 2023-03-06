const typesRepo = require("../repositories/typesRepo");
const { getWithCacheAside } = require("../API/api");

exports.getAllTypes = async () => {
  return await typesRepo.getAllTypes();
};
