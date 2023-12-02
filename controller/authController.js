// const {loginAuthModel} = require('../models/authModel');
const conn = require('../config/connection');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const base = (req, res) => {
  res.status(200).json({
    message: 'Ini adalah Rute Awal',
  });
};

const login = (req, res) => {
  try {
    const sql = 'SELECT * FROM users WHERE username=?;';
    const {username, password} = req.body;

    conn.query(sql, [username], (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      // Check if username exists
      if (result.length === 0) {
        return res.status(400).json({
          code: 400,
          status: 'BAD REQUEST',
          message: 'username tidak sesuai',
          data: null,
        });
      };

      bcrypt.compare(password, result[0].password, (bErr, bResult) => {
        if (bErr) {
          // Check if password is incorrect
          return res.status(400).json({
            code: 400,
            msd: bErr,
          });
        };

        if (bResult) {
          // Generate tokens
          const loguser = {
            id: result[0].id,
            username: result[0].username,
          };
          const accessToken = jwt.sign(loguser, process.env.SECRET_KEY, {
            expiresIn: '1h',
          });
          const refreshToken = jwt.sign(loguser, process.env.REFRESH_TOKEN_KEY);
          const response = {
            code: 200,
            status: 'SUCCESS',
            user_id: result[0].id,
            message: 'Login berhasil',
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          return res.status(200).json(response);
        } else {
          return res.status(400).json({
            code: 400,
            status: 'BAD REQUEST',
            message: 'Password salah 2',
            data: null,
          });
        };
      });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error during login',
      data: null,
    });
  }
};

const refresh = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({message: 'Refresh token tidak ditemukan'});
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Gagal untuk autentikasi refresh token',
      });
    }

    const user = {id: decoded.id, username: decoded.username};
    console.log(user);
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({accessToken});
  });
};

module.exports = {
  base,
  login,
  refresh,
};
