const conn = require('../config/connection');

const bahan = (req, res) => {
  try {
    const sql = 'SELECT bahan.id, bahan.nama_bahan, foto_bahan.foto FROM bahan INNER JOIN foto_bahan ON bahan.id = foto_bahan.id_bahan;';
    conn.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          status: 'INTERNAL SERVER ERROR',
          message: 'Error querying the database',
          data: null,
        });
      } else {
        return res.status(201).json({
          code: 201,
          status: 'OK',
          message: 'Data bahan didapatkan',
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error during get bahan',
      data: null,
    });
  };
};

const bahanDetailByID = (req, res) => {
  const bahanID = req.params.id;
  try {
    const sql = 'SELECT bahan.*, foto_bahan.foto FROM bahan INNER JOIN foto_bahan ON bahan.id = foto_bahan.id_bahan WHERE bahan.id = ?;';
    conn.query(sql, [bahanID], (err, result) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          status: 'INTERNAL SERVER ERROR',
          message: 'Error querying the database',
          data: null,
        });
      } else if (result.length === 0) { // Handle ID not found
        return res.status(404).json({
          code: 404,
          status: 'NOT FOUND',
          message: 'ID not found in the database',
          data: null,
        });
      } else {
        return res.status(201).json({
          code: 201,
          status: 'OK',
          message: 'Detail Data bahan didapatkan',
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error during get detail bahan',
      data: null,
    });
  };
};

module.exports = {
  bahan,
  bahanDetailByID,
};
