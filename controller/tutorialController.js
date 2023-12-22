const conn = require('../config/connection');

const tutorial = (req, res) => {
  const idMenu = req.params.id;
  try {
    const sql = 'SELECT * FROM tutorial WHERE id_menu = ?;';
    conn.query(sql, [idMenu], (err, result) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          status: 'INTERNAL SERVER ERROR',
          message: 'Unable to retrieve data from the database',
          data: null,
        });
      } else {
        const tutorialData = result.length > 0 ? result[0] : null;
        return res.status(201).json({
          code: 201,
          status: 'OK',
          message: 'Tutorial data retrieved successfully',
          data: tutorialData,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error while fetching tutorial data',
      data: null,
    });
  };
};

module.exports = {
  tutorial,
};
