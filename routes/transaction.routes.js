const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction.controller");




router.get("/", controller.getAll);

router.post("/",controller.ajouter);

router.get("/filter", controller.filterByType);

module.exports = router;
