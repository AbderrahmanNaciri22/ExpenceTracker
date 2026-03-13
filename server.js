require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());
app.use(function (req,res,next){
  console.log("test");next()})
app.use("/transaction", require("./routes/transaction.routes"));



mongoose.connect(process.env.MONGO_URI).then(() => console.log("Atlas connected")).catch(err => console.log(err));
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

