exports.test = (req, res) => {
  res.json({ message: "Transaction route is working!" });
}

exports.ajouter = async (req, res) => {
    const Transaction = require("../models/Transaction");

  const data = await Transaction.create({
    title: "Salary",
    amount: 3000,
    category:"sport",
    type: "expense",
    createdAt:"",
    date: new Date()
  });
  res.json({ message: "Is created !!" });

}

exports.filterByType = async(req, res) => {
  try {
    const Transaction = require("../models/Transaction");
    const {type} = req.query
    const filter = {}
    if(type){
      filter.type = type
    }

    // select * from Transaction WHERE  type="income";
    const transactions = await Transaction.find(filter).sort({date : -1})
  }catch(err){
    next(err)
  }

}