const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  if (!token) {
    return res.status(401).json({
      message: 'Harap autentikasi terlebih dahulu Token not provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.username = decoded.username;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Token tidak valid',
    });
  }
};

module.exports = auth;
