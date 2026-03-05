const Transaction = require("../utils/export.util");
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

async function getTotalExpense(type) {
    const transactions = await Transaction.find({ type: type }).sort({ date: -1 });

    let total = 0;

    transactions.forEach(t => {
        total += t.amount;
    });

    return total;
}


async function blanceVerifyAndCategoryCheck(req, res, next) {
        if(!req.body){
            return res.status(404).json("Body required")
        }
         let totalExpense = await getTotalExpense("expense");
         let totalIncome = await getTotalExpense("income");

         blance = totalIncome-totalExpense;

         console.log(blance);
        const {title,amount,type,category,date,} = req.body;
        if(type == "expense"){
            if(blance<amount){
                return res.status(400).json("Balance not enough")
            };
            if(!category){
                return res.status(400).json("category obligatoire")
            }
        }

        if(!title){
            return res.status(400).json("title obligatoire")
        }
        if(parseInt(amount) < 0){
            return res.status(400).json("amount not positive ");
        }
        if (!dateRegex.test(date)) {
            return res.status(400).json({ message: "Date must be yyyy/mm/dd" });
            }

      next()
}

module.exports = blanceVerifyAndCategoryCheck;