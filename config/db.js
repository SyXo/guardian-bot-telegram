const Datastore = require("nedb-promises");
const db = new Datastore({ filename: "./db/users.db", autoload: true });

module.exports = db;
