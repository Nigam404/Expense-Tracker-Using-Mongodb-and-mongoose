const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
// const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const signRouter = require("./routes/signR");
const expenseRouter = require("./routes/expenseR");
const purchaseRouter = require("./routes/purchaseR");
const userRouter = require("./routes/userR");
const premiumRouter = require("./routes/premiumR");
const forgotpasswordRouter = require("./routes/forgotpasswordR");

const app = express();

//file to write log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

//middlewares
app.use(cors());
app.use(bodyparser.json());
// app.use(helmet({ contentSecurityPolicy: false })); //provide security through headers.
app.use(morgan("combined", { stream: accessLogStream })); //used to log request information.

//routes
app.use(signRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(userRouter);
app.use(premiumRouter);
app.use(forgotpasswordRouter);
//if any not defined routes comes in...it will show login page.
app.use((req, res) => {
  console.log("REQUESTING URL->", req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

//...SERVER
mongoose
  .connect(
    "mongodb+srv://nigam:nigam404@cluster0.99k3bnv.mongodb.net/Expense-Tracker-App?retryWrites=true"
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log("App is listening...");
  })
  .catch((err) => console.log(err));
