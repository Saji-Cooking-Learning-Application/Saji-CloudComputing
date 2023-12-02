const jwt = require('jsonwebtoken');
const conn = require('../config/connection');
const mysql = require('mysql2');

// Middleware untuk memeriksa kevalidan token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;

  if (!token) {
    return res.status(401).json({error: true, message: 'Token not provided'});
  }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({error: true, message: 'Invalid token'});
    }

    const query = 'SELECT * FROM ?? WHERE ??=?';
    const table = ['auth_tokens', 'token', token];

    query = mysql.format(query, table);
    conn.query(query, function(error, rows) {
      if (error) {
        console.log(error);
        return res.status(500).json({error: true, message: 'Database error'});
      }

      if (rows.length === 0) {
        return res.status(401).json({error: true, message: 'Invalid token'});
      }

      req.user = decoded;

      // Token valid, lanjutkan ke endpoint selanjutnya
      next();
    });
  });
};

module.exports = verifyToken;
