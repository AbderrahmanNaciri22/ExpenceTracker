const Transaction = require("../utils/export.util")

function blanceVerifyAndCategoryCheck(req, res, next) {
     const data =  Transaction.find().sort({ date: -1 });
      res.json("test");
      next()
}

module.exports = blanceVerifyAndCategoryCheck;