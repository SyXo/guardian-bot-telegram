const { Telegraf } = require("telegraf");
const config = require("../../config/config");
const { messages } = require("../translations/messages");

const getMessage = messages("es");
const { tokentelegram } = config;

const bot = new Telegraf(tokentelegram);

bot.start((ctx) => ctx.reply(getMessage.start));

bot.command("/add", (ctx) => ctx.reply("Agregar scammer"));

bot.command("/all", (ctx) => ctx.reply("Listado de todos los scammer"));

bot.command("/search", (ctx) => ctx.reply("Buscar scammer"));

bot.launch();

module.exports = bot;
