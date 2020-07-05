// config should be imported before importing any other file
const polyfill = require("babel-polyfill");
const { serverport, env } = require("./config/config");
const app = require("./config/express");

const debug = require("debug")("GuardianOfMoneyBot:index");

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(serverport, () => {
    console.info(`Server started on port ${serverport} (${env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
