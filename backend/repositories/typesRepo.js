const db = require("../db/db");

exports.getAllTypes = async () => {
  return await db.get().collection("EVENTS_TYPE").find({}).toArray();
};

exports.getTypeById = async (id) => {
  return await db.get().collection("EVENTS_TYPE").findOne({
    id: id,
  });
};
