const scraperService = require("../services/scraperService");

const getLaptops = async (req, res) => {
  try {
    const searchTerm = req.query.term || "lenovo";
    const laptops = await scraperService.getLaptops(searchTerm);

    return res.status(200).json(laptops);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar laptops" });
  }
};

module.exports = { getLaptops };
