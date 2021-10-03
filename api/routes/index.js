const { Router } = require("express");
const CityController = require("../controllers/CityController");

const router = Router();

router.get("/api/city", CityController.getAllCities);

module.exports = router;
