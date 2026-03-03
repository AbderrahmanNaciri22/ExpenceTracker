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