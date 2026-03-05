const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction.controller");
const blanceVerifyAndCategoryCheck = require("../middleware/balance.middleware");

router.get("/", controller.getAll);

router.get("/filter", controller.filterByType);
router.get("/stats", controller.stats);


router.post("/", blanceVerifyAndCategoryCheck, controller.ajouter);

router.put("/:id", controller.updateTransaction);

router.delete("/:id", controller.deleteTransaction);

module.exports = router;