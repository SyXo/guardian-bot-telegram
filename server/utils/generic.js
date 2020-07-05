const parseMessage = (msg, name) => {
  const { text } = msg;
  return text.replace(`/${name} `, " ");
};

const isGroupChat = (msg) => {
  const { type } = msg.chat;
  return type === "group" ? true : false;
};

module.exports = {
  parseMessage,
  isGroupChat,
};
