const Joi = require("joi");

module.exports = {
  // Filtering params all endpoints order_by,sort_by,offset,limit
  // params: {
  //   query: {}
  // },

  // POST /v1/custom
  custom: {
    body: { content: Joi.array().required() },
  },
};
