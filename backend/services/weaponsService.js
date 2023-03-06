const weaponsRepo = require("../repositories/weaponsRepo");

exports.getAllWeapons = async () => {
  return await weaponsRepo.getAllWeapons();
};
