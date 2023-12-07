const Joi = require('joi');

// Validation for registration
const registerValidate = Joi.object({
  username: Joi.string()
      .required(),
  password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])[a-zA-Z0-9]{8,30}$/)
      .message('Password harus berisi (minimal 1) huruf besar dan angka saja, dan panjangnya minimal 8 karakter')
      .required(),
  nama: Joi.string()
      .min(3)
      .max(100)
      .required(),
  email: Joi.string()
      .email()
      .required(),
  hp: Joi.string() // Assuming the phone number is a string
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(15)
      .message('Nomor HP harus berisi angka saja dan panjangnya minimal 10 karakter')
      .required(),
}).options({abortEarly: false});

module.exports = {
  registerValidate,
};
