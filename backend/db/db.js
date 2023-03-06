const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbName = `${process.env["DB_NAME"]}`;
const mongodbUrl = `mongodb://${process.env["HOST_IP"]}:27017`;

let mongodb;

const connect = (callback) => {
  console.log("trying connect to: " + dbName);
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
