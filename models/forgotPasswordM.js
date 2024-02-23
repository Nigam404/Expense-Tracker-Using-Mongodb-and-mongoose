const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema({
  id: {
    type: Schema.Types.UUID,
  },
  active: {
    type: Boolean,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Forgotpassword", forgotPasswordSchema);
