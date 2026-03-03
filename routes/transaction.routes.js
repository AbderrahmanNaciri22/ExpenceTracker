
const express = require('express');
const router = express.Router();
const controller = require("../controllers/transaction.controller");




router.get("/ajoute", controller.test);

router.post("/seed",controller.ajouter);

router.get("/:type", controller.filterByType)



module.exports = router;
