const bot = require("../../config/telegrambot");
const { messages } = require("../translations/messages");
const db = require("../../config/db");

const getMessage = messages("es");

bot.start((ctx) => ctx.reply(getMessage.start));

bot.help((ctx) => ctx.reply("Help incoming!"));

bot.command("/id", async (ctx) => {
  const message = ctx.message.text.split(" ");
  if (message.length !== 2 || message[1] === undefined) {
    ctx.reply(getMessage.alertSearchById);
    return false;
  }

  await db.findOne({ id: Number(message[1]) }).then((scammer) => {
    if (scammer) {
      ctx.replyWithHTML(`<strong> CUIDADO !!!!! POSIBLE SCAMMER!!! </strong> `);
      ctx.reply(`First Name: @${scammer.first_name}`);
      ctx.reply(`User Name: ${scammer.username}`);
      ctx.reply(`Id: ${scammer.id}`);
    } else {
      ctx.replyWithHTML(
        `No se encuentra ningún usuario con <b>id ${message[1]} </b>.`
      );
    }
  });

  return true;
});

bot.command("/username", async (ctx) => {
  const message = ctx.message.text.split(" ");
  if (message.length !== 2 || message[1] === undefined) {
    ctx.reply(getMessage.alertSearchById);
    return false;
  }

  await db.findOne({ username: message[1].toLowerCase() }).then((scammer) => {
    if (scammer) {
      ctx.replyWithHTML(`<strong> CUIDADO !!!!! POSIBLE SCAMMER!!! </strong> `);
      ctx.reply(`First Name: @${scammer.first_name}`);
      ctx.reply(`User Name: ${scammer.username}`);
      ctx.reply(`Id: ${scammer.id}`);
    } else {
      ctx.replyWithHTML(
        `No se encuentra ningún usuario con <b>user name ${message[1]} </b>.`
      );
    }
  });

  return true;
});

bot.command("/firstname", async (ctx) => {
  const message = ctx.message.text.split(" ");
  if (message.length !== 2 || message[1] === undefined) {
    ctx.reply(getMessage.alertSearchById);
    return false;
  }

  await db.findOne({ first_name: message[1] }).then((scammer) => {
    if (scammer) {
      ctx.replyWithHTML(`<strong> CUIDADO !!!!! POSIBLE SCAMMER!!! </strong> `);
      ctx.reply(`First Name: @${scammer.first_name}`);
      ctx.reply(`User Name: ${scammer.username}`);
      ctx.reply(`Id: ${scammer.id}`);
      ctx.replyWithHTML(`<strong> CUIDADO !!!!! POSIBLE SCAMMER!!! </strong> `);
    } else {
      ctx.replyWithHTML(
        `No se encuentra ningún usuario con <b>first name ${message[1]} </b>.`
      );
    }
  });

  return true;
});

bot.launch();
