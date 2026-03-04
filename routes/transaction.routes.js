const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction.controller");
const blanceVerifyAndCategoryCheck = require("../middleware/balance.middleware")




router.get("/",blanceVerifyAndCategoryCheck ,controller.getAll);

router.post("/",controller.ajouter);

router.delete("/:id",controller.deleteTransaction);
router.put("/:id",controller.updateTransaction);



router.get("/filter", controller.filterByType);

module.exports = router;
