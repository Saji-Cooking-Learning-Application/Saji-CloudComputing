const express = require('express');
const {loginValidate} = require('../validation/loginSchema');
const {registerValidate} = require('../validation/registerSchema');
const {validate} = require('../middleware/validate');
const {register, login, refresh} = require('../controller/authController');
const {resep, resepDetailByID} = require('../controller/resepController');
const {bahan, bahanDetailByID} = require('../controller/bahanController');
const auth = require('../middleware/authentication');
const router = new express.Router();
const conn = require('../config/connection');

router.get('/', (req, res) => {
  res.status(200).json({
    'message': 'Welcome to Saji API server. We recommend that you first register and login before accessing our endpoints.',
  });
});
router.post('/register', validate(registerValidate), register);
router.post('/login', validate(loginValidate), login);
router.post('/refresh', refresh);

router.get('/resep', auth, resep);
router.get('/resep/:id', auth, resepDetailByID);

router.get('/bahan', auth, bahan);
router.get('/bahan/:id', auth, bahanDetailByID);

router.get('/user', auth, (req, res) => {
  sql = 'SELECT * FROM users;';
  conn.query(sql, (err, result) => {
    res.json({
      datas: result,
    });
  });
});

module.exports = router;
