
const express = require('express');
const router = express.Router();
const controller = require("../controllers/transaction.controller");




router.get("/", controller.test);

module.exports = router;




// router.get("/seed", async (req, res) => {
//   const Transaction = require("../models/Transaction");

//   const data = await Transaction.create({
//     title: "Salary",
//     amount: 3000,
//     type: "income",
//     date: new Date()
//   });

//   res.json(data);
// });

