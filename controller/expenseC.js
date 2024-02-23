const Expense = require("../models/expenseM");

//getting expense controller...............................................................................
module.exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }); //getting expenses added by authenticated user.

    if (expenses.length > 0) {
      res.json(expenses);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
  }
};

//post or adding expense controller........................................................................
module.exports.postExpense = async (req, res, next) => {
  try {
    const savedData = await Expense.create({
      amount: req.body.amount,
      description: req.body.description,
      catagory: req.body.catagory,
      userId: req.user.id, //req.user carry the user info that passed from authentication middleware.
    });

    console.log("data saved in DB", savedData);
    res.json(savedData.dataValues);
  } catch (error) {
    console.log(error);
  }
};

//delete controller......................................................................................
module.exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.expId;
    console.log(id);
    await Expense.findByIdAndDelete(id);

    console.log("Expense info removed from DB");
    res.json({ message: "data removed succesfully" });
  } catch (error) {
    console.log(error);
  }
};
