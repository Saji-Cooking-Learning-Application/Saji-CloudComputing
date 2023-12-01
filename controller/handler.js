const base = (req, res) => {
  res.status(200).json({
    message: 'Ini adalah Rute Awal',
  });
};

// const login = (req, res) => {
// };

module.exports = {
  base,
  // login,
};
