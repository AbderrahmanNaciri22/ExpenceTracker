 const Transaction = require("../models/Transaction");

exports.getAll = async (req, res) => {
  const data = await Transaction.find().sort({ date: -1 });
  return res.json({ data });
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
  return res.status(201).json({ message: "Is created !!" });
};

exports.deleteTransaction = async (req, res) => {
  try{
      const deleted = await Transaction.findByIdAndDelete(req.params.id);

  if(!deleted){
        return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "Deleted successfully" });

  }catch{
        res.status(400).json({ error: "Invalid ID" });
  }


}

exports.updateTransaction = async (req, res) => {
  try{
    const update = await Transaction.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true });

    if(!update){
      return res.status(404).json("not found");
    }

    res.json(update);
  }catch{
     res.status(400).json({ error: error.message });
  }
}


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
