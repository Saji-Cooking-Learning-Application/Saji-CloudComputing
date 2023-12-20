const conn = require('../config/connection');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const register = (req, res) => {
  try {
    const sqlSelect = 'SELECT * FROM users WHERE username=?;';
    const {nama, username, email, hp, password} = req.body;

    // Check if the username already exists
    conn.query(sqlSelect, [username], (err, result) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          status: 'INTERNAL SERVER ERROR',
          message: 'Error querying the database',
          data: null,
        });
      }

      if (result.length) {
        return res.status(409).json({
          code: 400,
          status: 'BAD REQUEST',
          message: 'Username sudah digunakan',
          data: null,
        });
      } else {
        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              code: 500,
              status: 'INTERNAL SERVER ERROR',
              message: 'Error hashing the password',
              data: null,
            });
          }

          // Insert user into the 'users' table
          const sqlInsertUser = 'INSERT INTO users (username, password, status) VALUES (?, ?, 1);';
          conn.query(sqlInsertUser, [username, hash], (err, result) => {
            if (err) {
              return res.status(400).json({
                code: 400,
                status: 'BAD REQUEST',
                message: 'Error inserting data into the users table',
                data: null,
              });
            }

            // Retrieve the latest inserted ID
            const sqlSelectLatestID = 'SELECT id FROM users ORDER BY id DESC LIMIT 1;';
            conn.query(sqlSelectLatestID, (err, result) => {
              if (err) {
                return res.status(500).json({
                  code: 500,
                  status: 'INTERNAL SERVER ERROR',
                  message: 'Error querying the latest ID from the users table',
                  data: null,
                });
              }

              const latestIdUsers = result[0].id;

              // Insert user details into the 'detail_users' table
              const sqlInsertDetail = 'INSERT INTO detail_users (id_users, nama, email, no_hp) VALUES (?, ?, ?, ?);';
              conn.query(sqlInsertDetail, [latestIdUsers, nama, email, hp], (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    code: 400,
                    status: 'BAD REQUEST',
                    message: 'Error inserting data into the detail_users table',
                    data: null,
                  });
                } else {
                  return res.status(201).json({
                    code: 201,
                    status: 'OK',
                    message: 'Berhasil Registrasi',
                    data: null,
                  });
                }
              });
            });
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error during registration',
      data: null,
    });
  }
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
            status: 'OK',
            user_id: result[0].id,
            message: 'Login Berhasil',
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          return res.status(200).json(response);
        } else {
          return res.status(400).json({
            code: 400,
            status: 'BAD REQUEST',
            message: 'Password Salah',
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
  register,
  login,
  refresh,
};
