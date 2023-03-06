const db = require("../db/db");

exports.getAllWeapons = async () => {
  return await db.get().collection("EVENTS_WEAPONS").find({}).toArray();
};
