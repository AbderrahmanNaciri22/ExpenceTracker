 const Transaction = require("../models/Transaction");

exports.getAll = async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  res.json({ data });
};
exports.ajouter = async (req, res) => {
 
    const { title, amount, category,type,date } = req.body;

  const data = await Transaction.create({
    title: title,
    amount: amount,
    category: category,
    type: type,
    createdAt: "",
    date: date,
  });
  res.status(201).json({ message: "Is created !!" });
};


exports.filterByType = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) {
      filter.type = type;
    }

    // select * from Transaction WHERE  type="income";
    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.status(201).json(transactions);
  } catch (err) {
    res.status(400).json("not working");
    // next(err);
  }
};
