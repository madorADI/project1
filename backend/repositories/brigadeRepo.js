const db = require("../db/db");

exports.getAllBrigades = async () => {
  return await db.get().collection("BRIGADES").find({}).toArray();
};

exports.getBrigadeById = async (id) => {
  return await db.get().collection("BRIGADES").findOne({
    id: id,
  });
};
