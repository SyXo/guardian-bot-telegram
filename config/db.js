const Datastore = require("nedb-promises");
const db = new Datastore({ filename: "./db/scammers.db", autoload: true });

module.exports = db;
