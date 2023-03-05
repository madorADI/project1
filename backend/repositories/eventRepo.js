const db = require("../db/db");
const { ObjectId } = require("mongodb");

exports.getAllEvents = async () => {
  return await db.get().collection("EVENTS").find({}).toArray();
};

exports.getEventById = async (id) => {
  return await db
    .get()
    .collection("EVENTS")
    .findOne({
      _id: ObjectId(id),
    });
};

exports.uploadEvent = async (newEvent) => {
  return await db.get().collection("EVENTS").insertOne(newEvent);
};
