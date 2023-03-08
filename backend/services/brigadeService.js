const brigadeRepo = require("../repositories/brigadeRepo");

exports.getAllBrigades = async () => {
  return await brigadeRepo.getAllBrigades();
};
