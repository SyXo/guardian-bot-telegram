const messagesDefine = {
  es: {
    start: `Hola soy The Guardian voy a protegerte, para poder hacerlo necesito que cargues los usuarios de telegram.
    \n El listado se arma por la comunidad cualquier usuario puede enviar un presunto scammer para ser agregado.
    \n Para obtener un listado de comandos escriba /help.
    `,
    help: `Help con listado de comandos`,
  },
  en: {
    start: `Now you can use the bot to create participant listings, see /help to get a list of commands. \n 
    When creating a list, it is initialized with a maximum of 10 participants, the number of participants can be modified with /participants "number of participants".`,
    create: `The list of players was created successfully \u{1F609}\u{1F44F}!`,
    error: `An error occurred on the server \u{1F648}\u{1F649}\u{1F64A}`,
    assist: `confirm assistance \u{1F446}`,
    noatssist: `not assist \u{1F485}\u{1F486}\u{1F487}`,
    listempty: `There are no confirmed \u{1F62D}`,
    listheader: `<b>\u{26BD} List of Confirmed \u{26BD}</b>\n`,
    missingcant: `\u{2757} Confirm missing`,
    onlygroupmsg: `I can only be used in a telegram group \u{1F647}`,
    help: `soy gel`,
  },
};

const messages = (language_code) => {
  let message = {};
  if (language_code === "es") {
    message = messagesDefine.es;
  } else {
    message = messagesDefine.en;
  }
  return message;
};

module.exports = { messages };
