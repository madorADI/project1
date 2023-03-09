const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbName = `${process.env["DB_NAME"]}`;
// const mongodbUrl = `mongodb://mongo:${process.env["DB_USERNAME"]}@${process.env["DB_IP"]}:${process.env["DB_PORT"]}/?authSource=admin`;
const mongodbUrl = `mongodb://${process.env["DB_IP"]}:27017`;

let mongodb;

const connect = (callback) => {
  console.log("trying connect to: " + mongodbUrl);
  MongoClient.connect(
    mongodbUrl,
    { useUnifiedTopology: true },
    (err, client) => {
      mongodb = client.db(dbName);
      console.log("connected to: " + dbName);
      callback();
    }
  );
};

const get = () => mongodb;

const close = () => mongodb.close();

module.exports = {
  connect,
  get,
  close,
};
