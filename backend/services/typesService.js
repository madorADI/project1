const typesRepo = require("../repositories/typesRepo");

exports.getAllTypes = async () => {
  return await typesRepo.getAllTypes();
};
