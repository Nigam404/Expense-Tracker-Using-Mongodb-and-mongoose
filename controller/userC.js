const User = require("../models/userM");

exports.getUser = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  res.json(user);
};

exports.updateTotalExpense = async (req, res, next) => {
  try {
    const id = req.user.id;
    const amount = Number(req.body.amount); //because req.body.amount is coming as a string
    const user = await User.findById(id);
    let existingAmount = user.totalexpense;
    // console.log("type check->", typeof amount, typeof user.totalexpense);

    if (!existingAmount) {
      await User.findByIdAndUpdate(id, { totalexpense: amount });
    } else {
      const newTotal = Number(existingAmount) + amount;
      await User.findByIdAndUpdate(id, { totalexpense: newTotal });
    }
    res.json({ message: "Total expense updated(added)" });
  } catch (error) {
    console.log(error);
  }
};

exports.subtractTotalExpense = async (req, res, next) => {
  try {
    const id = req.user.id;
    const amount = Number(req.body.amount); //because req.body.amount is coming as a string
    const user = await User.findById(id);
    let existingAmount = user.totalexpense;

    const newExpense = Number(existingAmount) - amount;
    await User.findByIdAndUpdate(id, { totalexpense: newExpense });

    res.json({ message: "Total expense reduced" });
  } catch (error) {}
};
