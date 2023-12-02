const Joi = require('joi');

// rules validasi
const loginValidate = Joi.object({
  username: Joi.string()
      .required(),
  password: Joi.string()
      .required(),
}).options({
  abortEarly: false,
});

module.exports = {
  loginValidate,
};
