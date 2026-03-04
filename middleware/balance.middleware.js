const Transaction = require("../utils/export.util");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

async function blanceVerifyAndCategoryCheck(req, res, next) {
        const {title,amount,type,category,date,} = req.body;
        if(!title){
            return res.send("title vide")
        }
        if(parseInt(amount) < 0){
            return res.send("amount not positive ");
        }
        if (!dateRegex.test(date)) {
            return res.status(400).json({ message: "Date must be yyyy/mm/dd" });
            }
      next()
}

module.exports = blanceVerifyAndCategoryCheck;