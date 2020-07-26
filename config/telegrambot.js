const { Telegraf } = require("telegraf");
const config = require("./config");

const { tokentelegram } = config;

const bot = new Telegraf(tokentelegram);

module.exports = bot;
