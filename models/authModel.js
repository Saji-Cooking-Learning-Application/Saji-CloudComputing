// const conn = require('../config/connection');

const loginAuthModel = (body) => {
  const SQLQuery = 'SELECT * FROM users WHERE id=?;';
  const values = [body.email];

  return conn.query(SQLQuery, values);
};

module.exports = {
  loginAuthModel,
};
