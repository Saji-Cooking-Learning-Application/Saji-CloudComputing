const base = (req, res) => {
  res.status(200).json({
    message: "Ini adalah Rute Awal"
  });
};

module.exports = {
  base
};
