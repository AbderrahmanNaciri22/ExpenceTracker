const Transaction = require("../utils/export.util");
// const { buildPagination } = require("../utils/pagination.util");
const per_page = 5;

function buildPagination(page, pageSize) {
  const currentPage = parseInt(page) || 1;
  const skip = (currentPage - 1) * pageSize;
  return { currentPage, skip };
}

async function getTotalExpenseIncombymonthes(type,month,year,category) {
  let transactions;
  let total = 0;
  let incomeTotal=0 
  let expenseTotal = 0;
    if(type){
      transactions = await Transaction.find({ type: type }).sort({ date: -1 });
      transactions.forEach(t => {
        const yearandmonth = (t.date.toISOString().slice(0,7));
        //  console.log( month+"-"+year);
        if(yearandmonth == year+"-"+month){
            // console.log("tesssss ======"+yearandmonth);
            // total += t.amount
            if(t.type == "expense"){
              expenseTotal += t.amount 
            }else if(t.type == "income")
            {
              incomeTotal += t.amount 
            }
        }
  
    });
          if(expenseTotal){
          total = expenseTotal;
        }else{
             total = incomeTotal;

        }
    }else if(year&&month){
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      transactions = await Transaction.find({ date: { $gte: start, $lt: end} });
       transactions.forEach(t => {
            if(t.type == "expense"){
              expenseTotal += t.amount 
            }else if(t.type == "income")
            {
              incomeTotal += t.amount 
            }
        })
            total = incomeTotal - expenseTotal;
    }else if(category){
        transactions = await Transaction.find({ category: category });
        transactions.forEach(t =>{
         total += t.amount;
        })
    }


    return total
    // return date;
}


exports.getAll = async (req, res) => {
  try {
    const { currentPage, skip } = buildPagination(req.query.page, per_page);
    // console.log("Query page:", req.query.page);
    const total = await Transaction.countDocuments();
    const data = await Transaction.find()
      .sort({ date: -1 })
      .skip(skip) // skip => where to start
      .limit(per_page); // limit => where to stop
    return res.json({
      page: currentPage,
      pageSize: per_page,
      total,
      totalPages: Math.ceil(total / per_page),
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.ajouter = async (req, res) => {
  const { title, amount, category, type, date } = req.body;

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
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const update = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!update) {
      return res.status(404).json("not found");
    }

    res.json(update);
  } catch {
    res.status(400).json({ error: error.message });
  }
};

exports.filterByType = async (req, res) => {
  try {
    const { currentPage, skip } = buildPagination(req.query.page, per_page);
    const { type } = req.query;
    const filter = {};
    if (type) {
      filter.type = type;
    }

    // Pagination
    
    const total = await Transaction.countDocuments(filter);//calcul dyel total lly filtré
    const transactions = await Transaction.find(filter)// select * from Transaction WHERE  type="income";
      .sort({ date: -1 })
      .skip(skip)
      .limit(per_page);
      
    return res.status(200).json({
      page: currentPage,
      pageSize: per_page,
      total,
      totalPages: Math.ceil(total / per_page),
      data: transactions
    });
  } catch (err) {
    res.status(400).json("not working");
    // next(err);
  }
};

exports.stats = async (req,res) => {
      const {month , year ,type,category } = req.query;
      let total = 0
      total = await getTotalExpenseIncombymonthes(type,month,year,category);
      if(type == "income"){
        return res.status(200).json("total des revenus par mois = "+total)
      }else if(type == "expense"){
        return res.status(200).json("total des depenses par mois = "+total)
      }else if(!type&&!category){
        return res.status(200).json("solde du mois est = "+total)
      }else if(category){
        return res.status(200).json("total de category  "+category+" est ="+total)
      }
      
}
