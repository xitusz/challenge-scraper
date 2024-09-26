const router = require("express").Router();
const scraperController = require("../controllers/scraperController");

router.get("/laptops", scraperController.getLaptops);

module.exports = router;
