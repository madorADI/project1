const db = require("../db/db");
const { ObjectId } = require("mongodb");

exports.getAllEvents = async () => {
  return await db.get().collection("ALERTS").find({}).toArray();
};

exports.getEventById = async (id) => {
  return await db
    .get()
    .collection("ALERTS")
    .findOne({
      _id: ObjectId(id),
    });
};

exports.uploadEvent = async (newEvent) => {
  return await db.get().collection("ALERTS").insertOne(newEvent);
};
