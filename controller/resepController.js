const conn = require('../config/connection');

const resep = (req, res) => {
  try {
    const sql = 'SELECT menu.id, MIN(menu.nama_menu) AS nama_menu, MIN(foto_menu.foto) AS foto FROM menu INNER JOIN foto_menu ON menu.id = foto_menu.id_menu GROUP BY menu.id;';
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
          message: 'Data resep didapatkan',
          data: result,
        });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error during login',
      data: null,
    });
  };
};

const resepDetailByID = (req, res) => {
  const resepID = req.params.id;
  try {
    const sql = 'SELECT menu.*, foto_menu.foto FROM menu INNER JOIN foto_menu ON menu.id = foto_menu.id_menu WHERE menu.id=?;';
    const sqlResep = 'SELECT bahan.nama_bahan, resep.takaran, resep.unit FROM resep INNER JOIN bahan ON resep.id_bahan = bahan.id WHERE resep.id_menu = ?;';

    conn.query(sql, [resepID], (err, result) => {
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
        conn.query(sqlResep, [resepID], (err, resultResep) => {
          if (err) {
            return res.status(500).json({
              code: 500,
              status: 'INTERNAL SERVER ERROR',
              message: 'Error querying the database',
              data: null,
            });
          } else {
            // eslint-disable-next-line camelcase, no-unused-vars
            const {foto, id, nama_menu, deskripsi, ...nutrisi} = result[0];

            const assets = {
              foto1: result[0].foto,
              foto2: result[1].foto,
              foto3: result[2].foto,
            };

            const responseData = {
              code: 201,
              status: 'OK',
              message: 'Detail resep didapatkan',
              data: {
                id,
                // eslint-disable-next-line camelcase
                nama_menu,
                deskripsi,
                nutrisi: {...nutrisi},
                assets,
                resep: resultResep,
              },
            };
            return res.status(201).json(responseData);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error during login',
      data: null,
    });
  };
};

module.exports = {
  resep,
  resepDetailByID,
};
