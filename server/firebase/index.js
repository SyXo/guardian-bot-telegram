const admin = require("firebase-admin");

const serviceAccount = require("../../scammerlist-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scammerlist.firebaseio.com",
});

module.exports = admin;
