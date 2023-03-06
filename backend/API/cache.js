const NodeCache = require("node-cache");
const serverCache = new NodeCache({ stdTTL: 15 });

module.exports.serverCache = () => {
  return serverCache;
};
