const express = require('express');
const {loginValidate} = require('../validation/loginSchema');
const {registerValidate} = require('../validation/registerSchema');
const {validate} = require('../middleware/validate');
const {
  base,
  register,
  login,
  refresh,
} = require('../controller/authController');
const auth = require('../middleware/authentication');
const router = new express.Router();
const conn = require('../config/connection');

router.get('/', base);
router.post('/register', validate(registerValidate), register);
router.post('/login', validate(loginValidate), login);
router.post('/refresh', refresh);


router.get('/user', auth, (req, res) => {
  sql = 'SELECT * FROM users;';
  conn.query(sql, (err, result) => {
    res.json({
      datas: result,
    });
  });
});

module.exports = router;
