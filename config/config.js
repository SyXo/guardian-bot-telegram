//import Joi from 'joi';
const Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test"])
    .default("development"),
  NODE_PORT: Joi.number().default(5050),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  serverport: envVars.NODE_PORT,
  tokentelegram: envVars.TOKE_TELEGRAM,
  namebot: envVars.NAME_BOT,
};

module.exports = config;
