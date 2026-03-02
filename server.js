require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Atlas connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});