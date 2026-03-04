const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  category:{
    type: String,
    enum:["sport","food","shooping","rent","billing"],
    required: function () {
      return this.type === "expense";
    }
    
  },
  
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: {createdAt:true , updatedAt : false}
});

module.exports = mongoose.model("Transaction", transactionSchema);